from flask import Flask, jsonify, request, session
import cx_Oracle
import sys
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta, datetime
import random

# sys.path.append('../../sqlcommands/commands')
# from apitoSQL import add_topic_to_database as fetcharticles

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "oracle+cx_oracle://guest:guest@172.22.134.159:1521/XE"
app.config["SECRET_KEY"] = '4d53112ca3f996eaf5572fb3eb7f9eeb4771fea4f0039d5a8f8d133959b14609'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)
CORS(app, resources={r"/login": {"origins": "*"},
                     r"/register": {"origins": "*"}})


db = SQLAlchemy()


login_manager = LoginManager()
login_manager.init_app(app)


class Users(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True,
                            nullable=False)
    password = db.Column(db.String(250),
                            nullable=False)
    first_name = db.Column(db.String(250),
                            nullable=False)
    last_name = db.Column(db.String(250),
                            nullable=False)
    email = db.Column(db.String(250),
                            nullable=False)
    phone_number = db.Column(db.Integer,
                            nullable=False)
    birth_date = db.Column(db.Date,
                            nullable=False)
    country = db.Column(db.String(250),
                            nullable=False)
#    profilePic = db.Column(BLOB)
    def get_id(self):
           return (self.user_id)


db.init_app(app)


with app.app_context():
   db.create_all()


# Configure Oracle connection 172.22.134.159
oracle_connection = cx_Oracle.connect('guest/guest@172.22.134.159:1521/XE')


# Create a cursor to execute SQL queries
cursor = oracle_connection.cursor()


# Define routes
@app.route('/')
def index():
    if 'username' in session:
        return f'Logged in as {session["username"]}'
    return 'You are not logged in'


@login_manager.user_loader
def loader_user(user_id):
   return Users.query.get(user_id)

# THIS ONE WORKS
@app.route('/login', methods=['POST'])
def login():

    # #GET TODAYS DATE
    # date = datetime.now()
    # date = str(date.strftime('%d-%b-%y')).upper()

    # #check to see if articles need to be fetched
    # check_articles = f"select article_id from articles where to_date(retrieved_date, 'DD-MON-YY') = {date}"
    # cursor.execute(check_articles)
    # todays_articles = cursor.fetchall()
    # if len(todays_articles) == 0:
    #     fetcharticles("arts")
    #     fetcharticles("business")
    #     fetcharticles("health")
    #     fetcharticles("technology")
    #     fetcharticles("world")
    #     fetcharticles("sports")
    #     fetcharticles("food")
    #     fetcharticles("politics")
    #     fetcharticles("travel")
    #     fetcharticles("tourism")
    #     fetcharticles("us")
    #     fetcharticles("entertainment")

    data = request.json
    user_str = data.get('username')
    pass_str = data.get('password')

    if request.method == "POST":
        user = Users.query.filter_by(username=user_str).first()

        if user.password == pass_str:
            login_user(user, remember=True)
            session['username'] = user_str


    try:
        cursor.execute("SELECT * FROM users WHERE username = :username and password = :password", {'username': user_str, 'password': pass_str})
        user = cursor.fetchone()

        # Extract the employee data from the database
        user_id = user[0]
        username = user[1]
        password = user[2]
        first = user[3]
        last = user[4]
        
        if user:
            return jsonify({'success': True, 'users': [user_id, username, password, first, last]})


    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route("/logout", methods=['POST'])
def logout():
    logout_user()
    logout_user_str = session.get('username')
    return jsonify({'success': True, 'logout_user': logout_user_str })


@app.route("/get_current_user", methods=['POST'])
def get_current_user():
    if current_user.is_authenticated:
        return jsonify({'authenticated': current_user.is_authenticated, 'user_id': current_user.user_id, 'username': current_user.username, 'firstName': current_user.first_name, 'lastName': current_user.last_name, })
    return jsonify({'authenticated': current_user.is_authenticated})


@app.route('/register', methods=['POST'])
def register_user():
    try:
        # Get data from request
        data = request.json
        username = data.get('username')
        password = data.get('password')
        firstName = data.get('firstName')
        lastName = data.get('lastName')
        birthDate = data.get('birthDate')
        phoneNumber = data.get('phoneNumber')
        email = data.get('email')
        country = data.get('country')

        # Hash the password
        #hashed_password = generate_password_hash(password)


        try:
            # Convert birthDate to the required format
            birthDate_formatted = datetime.strptime(birthDate, '%m/%d/%Y').strftime('%d-%b-%y')
            
            query = "INSERT INTO users (username, password, first_name, last_name, birth_date, phone_number, email, country) VALUES (:username, :password, :first_name, :last_name, TO_DATE(:birth_date, 'DD-MON-YY'), :phone_number, :email, :country)"
            cursor.execute(query, {'username': username, 'password': password, 'first_name': firstName, 'last_name': lastName, 'birth_date': birthDate_formatted, 'phone_number': phoneNumber, 'email': email, 'country': country})
            oracle_connection.commit()
        except Exception as e:
            oracle_connection.rollback()  # Rollback the transaction in case of error

        return jsonify({'success': True, 'message': 'User registered successfully'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/get_profile', methods=['POST'])
def get_profile():

    data = request.json
    user_str = data.get('user')

    try: 
        # get user data
        cursor.execute("SELECT * FROM users WHERE username = :username", {'username': user_str})
        user = cursor.fetchone()
        user_id = user[0]
        first = user[3]
        last = user[4]

        # get followers/following data
        cursor.execute("SELECT COUNT(follow_id) FROM followers WHERE followed_user_id = :followed_user_id and active = 1", {'followed_user_id': user_id})
        follower_data = cursor.fetchone()
        followers = follower_data[0]

        cursor.execute("SELECT * FROM followers WHERE follower_user_id = :user_id and active = 1", {'user_id': user_id})
        following = [row[2] for row in cursor.fetchall()]

        # get post data
        cursor.execute("SELECT COUNT(post_id) FROM posts WHERE user_id = :user_id", {'user_id': user_id})
        posts_data = cursor.fetchone()
        posts = posts_data[0]

        # get saved articles data
        cursor.execute("SELECT a.article_id, a.title, a.author, a.publish_date, a.url, a.image_url, a.description, a.topic FROM savedarticles s LEFT JOIN articles a ON s.article_id = a.article_id WHERE s.user_id = :user_id and s.active = 1 ORDER BY s.save_date DESC", {'user_id': user_id})
        articles = [[row[0], row[1], row[2], row[3], row[4], row[5], row[6], row[7], 1] for row in cursor.fetchall()]

        # get interests data
        cursor.execute("SELECT * FROM userinterests WHERE user_id = :user_id and active = 1", {'user_id': user_id})
        interests = [row[2] for row in cursor.fetchall()]

        return jsonify({'user_id': user_id, 'first_name': first, 'last_name': last, "followers": followers, "following": following, "posts": posts, "articles": articles, "interests": interests})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/get_user_by_name', methods=['POST'])
def get_user_by_name():

    data = request.json
    currUser_str = data.get('currUser')
    firstName_str = data.get('firstName')
    lastName_str = data.get('lastName')

    try:
        if lastName_str == "":
            cursor.execute("SELECT * FROM users WHERE (UPPER(first_name) LIKE :first_name OR UPPER(last_name) LIKE :first_name) AND username != :username", first_name=firstName_str.upper() + '%', username=currUser_str)
            users = [[row[0], row[1], row[3], row[4]] for row in cursor.fetchall()]
        else:
            cursor.execute("SELECT * FROM users WHERE UPPER(first_name) LIKE :first_name AND UPPER(last_name) LIKE :last_name AND username != :username", first_name=firstName_str.upper() + '%', last_name=lastName_str.upper() + '%', username=currUser_str)
            users = [[row[0], row[1], row[3], row[4]] for row in cursor.fetchall()]

        return jsonify({'users': users})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})



@app.route('/get_user_by_username', methods=['POST'])
def get_user_by_username():

    data = request.json
    currUser_str = data.get('currUser')
    user_str = data.get('user')

    try:
        cursor.execute("SELECT * FROM users WHERE UPPER(username) LIKE :username AND username != :curr_user", username=user_str.upper() + '%', curr_user=currUser_str)
        users = [[row[0], row[1], row[4], row[5]] for row in cursor.fetchall()]

        return jsonify({'users': users})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/for-you', methods=['POST'])
def recommend_six_articles():
    try:
        
        #REPLACE THIS LINE WITH A REAL USER
        data = request.json
        user_id = data.get('user_id')


        #GET TODAYS DATE
        date = datetime.now()
        date = str(date.strftime('%d-%b-%y')).upper()


        #GET USER INTERESTS
        topics_query = f"SELECT topic from userinterests where user_id = {user_id} and active = 1"
        cursor.execute(topics_query)
        topics = [row[0] for row in cursor.fetchall()]

        if len(topics) == 0:
            topics = ['arts', 'business', 'health', 'technology', 'world', 'sports', 'food', 'lifestyle', 'politics', 'travel', 'tourism', 'us', 'entertainment']


        #TEST TO SEE IF USERARTICLES POPULATED
        check_userarticles_query = f"SELECT * from userarticles where user_id = {user_id} and TO_CHAR(retrieved_date, 'DD-MON-YY') = '{date}'"
        cursor.execute(check_userarticles_query)
        userarticles_rows = cursor.fetchall()
        num_userarticles = len(userarticles_rows)


        load_more = request.args.get('load_more')

        if num_userarticles < 6 or load_more:
            
            recs = []
            while len(recs) < 6:
                random.shuffle(topics)
                for topic in topics:
                    #get a random article for the current topic
                    get_rec_query = f"SELECT * FROM (SELECT * FROM articles a LEFT JOIN userarticles u ON a.article_id = u.article_id AND u.user_id = {user_id} WHERE a.topic = '{topic}' AND u.article_id IS NULL AND TO_CHAR(a.retrieved_date, 'DD-MON-YY') = '{date}' ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= 1"
                    cursor.execute(get_rec_query)
                    rec = cursor.fetchone()
                    if rec is not None:
                        recs.append(rec[0])  


                        retrieved_date_str = rec[4].strftime('%Y-%m-%d %H:%M:%S') if rec[4] else None

                        insert_query = f"INSERT INTO userarticles(user_id, article_id, retrieved_date, displayed) VALUES({user_id}, {rec[0]}, TO_DATE('{retrieved_date_str}', 'YYYY-MM-DD HH24:MI:SS'), 0)"
                        cursor.execute(insert_query)  
                        oracle_connection.commit()
    
                    if len(recs) >= 6:
                        break
            recs = recs[:6]

        #CHECK TO SEE IF ARTICLES HAVE ALREADY BEEN DISPLAYED
        flag_query = f"SELECT * from userarticles WHERE user_id = {user_id} AND TO_DATE(retrieved_date, 'DD-MON-YY') = '{date}' AND displayed = 1"
        cursor.execute(flag_query)
        flag_count = len(cursor.fetchall())

        #NOW ONLY PULL 6 ARTICLES FROM USERARTICLES
        if load_more or flag_count == 0:
            userarticles_query = f"SELECT * FROM (SELECT u.article_id, a.title, a.author, a.retrieved_date, a.url, a.image_url, a.description, a.topic FROM userarticles u, articles a WHERE u.user_id = {user_id} AND u.article_id = a.article_id AND u.displayed = 0 AND TO_CHAR(a.retrieved_date, 'DD-MON-YY') = '{date}' ORDER BY u.userarticle_id) where rownum <= 6"
        else:
            userarticles_query = f"SELECT * FROM (SELECT u.article_id, a.title, a.author, a.retrieved_date, a.url, a.image_url, a.description, a.topic FROM userarticles u, articles a WHERE u.user_id = {user_id} AND u.article_id = a.article_id AND u.displayed = 1 AND TO_CHAR(a.retrieved_date, 'DD-MON-YY') = '{date}' ORDER BY u.userarticle_id)"
        cursor.execute(userarticles_query)
        results = cursor.fetchall()


        article_data = []
        if results:
            for result in results:

                    check_query = f"""
                        SELECT active FROM savedarticles
                        WHERE user_id = {user_id} AND article_id = {result[0]}
                    """
                    cursor.execute(check_query)

                    check = cursor.fetchone()
                    if check is not None:
                        favorited = check[0]
                    else:
                        favorited = 0

                    article_dict = {
                        'article_id': result[0],
                        'title': result[1],
                        'author': result[2],
                        'retrieved_date': result[3].strftime('%m/%d/%y'),
                        'url': result[4],
                        'image_url': result[5],
                        'description': result[6],
                        'topic': result[7],
                        'favorited': favorited
                    }
                    article_data.append(article_dict)

                    # Update displayed column for fetched articles
                    update_query = f"""
                        UPDATE userarticles
                        SET displayed = 1
                        WHERE user_id = {user_id} AND article_id = {result[0]}
                    """
                    cursor.execute(update_query)
                    oracle_connection.commit()


        oracle_connection.commit()

        return jsonify({'success': True, 'articles': article_data})


    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/mark-as-favorite', methods=['POST'])
def mark_as_favorite():
    try:
        data = request.json
        user_id = data.get('user_id')
        article_id = data.get('article_id')

        # Check if the record already exists in the database
        check_query = f"""
            SELECT active FROM savedarticles
            WHERE user_id = {user_id} AND article_id = {article_id}
        """
        cursor.execute(check_query)

        result = cursor.fetchone()
        if result is not None:
            active = result[0]
        else:
            active = -1
        
        
        #if article has been unstarred
        if active == 0:
            # If the record exists, update the 'displayed' column
            update_query = f"""
                UPDATE savedarticles
                SET active = 1
                WHERE user_id = {user_id} AND article_id = {article_id}
            """
            cursor.execute(update_query)
            oracle_connection.commit()
            return jsonify({'success': True, 'active': 1}), 200
        #if article has not been touched yet
        elif active == -1:
            insert_query = f"""
                INSERT INTO savedarticles (user_id, article_id, active)
                VALUES ({user_id}, {article_id}, 1)
            """
            cursor.execute(insert_query)
            oracle_connection.commit()
            return jsonify({'success': True, 'active': 1}), 200
        elif active == 1:
            update_query = f"""
                UPDATE savedarticles
                SET active = 0
                WHERE user_id = {user_id} AND article_id = {article_id}
            """
            cursor.execute(update_query)
            oracle_connection.commit()
            return jsonify({'success': True, 'active':0}), 200



    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

    

@app.route('/get-posts')
def get_posts():
    try:
        # Execute the query to fetch posts along with comments
        cursor.execute("""
            SELECT 
                P.POST_ID, U.USERNAME, P.CONTENT, P.PUBLISH_DATE AS POST_PUBLISH_DATE, 
                A.ARTICLE_ID, A.TITLE, A.AUTHOR, A.PUBLISH_DATE AS ARTICLE_PUBLISH_DATE, 
                A.NEWS_SOURCE, A.URL, A.IMAGE_URL, A.DESCRIPTION,
                C.CONTENT AS COMMENT_CONTENT, C.DATE_COMMENTED AS COMMENT_DATE,
                UC.USERNAME AS COMMENT_USERNAME, L.LIKE_ID AS LIKE_ID, L.USER_ID as LIKE_USER_ID, L.POST_ID as LIKE_POST_ID, L.ACTIVE as LIKE_ACTIVE
            FROM 
                POSTS P
            INNER JOIN 
                USERS U ON P.USER_ID = U.USER_ID
            INNER JOIN 
                ARTICLES A ON P.ARTICLE_ID = A.ARTICLE_ID
            LEFT JOIN 
                COMMENTS C ON P.POST_ID = C.POST_ID
            LEFT JOIN 
                USERS UC ON C.USER_ID = UC.USER_ID
            LEFT JOIN
                LIKES L ON P.POST_ID = L.POST_ID
            ORDER BY 
                P.POST_ID DESC
        """)

        # Fetch all posts along with comments
        rows = cursor.fetchall()

        # Convert the result to a list of dictionaries
        posts_data = []
        current_post_id = None
        for row in rows:
            post_id = row[0]
            if post_id != current_post_id:
                post_data = {
                    'POST_ID': post_id,
                    'USERNAME': row[1],
                    'CONTENT': row[2],
                    'POST_PUBLISH_DATE': row[3],
                    'ARTICLE_ID': row[4],
                    'TITLE': row[5],
                    'AUTHOR': row[6],
                    'ARTICLE_PUBLISH_DATE': row[7],
                    'NEWS_SOURCE': row[8],
                    'URL': row[9],
                    'IMAGE_URL': row[10],
                    'DESCRIPTION': row[11],
                    'COMMENTS': [],  # Initialize comments list for each post
                    'LIKES': []
                }
                posts_data.append(post_data)
                current_post_id = post_id

            # Add comment details to the comments list of the current post
            if row[12]:
                post_data['COMMENTS'].append({
                    'CONTENT': row[12],
                    'DATE': row[13],
                    'USERNAME': row[14]
                })
            
            # Add like details to the likes list of the current post
            if row[15]:
                post_data['LIKES'].append({
                    'LIKE_ID': row[15],
                    'USER_ID': row[16],
                    'POST_ID': row[17],
                    'ACTIVE': row[18]
                })
        return jsonify(posts_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    
# @app.route('/community-articles', methods=['GET'])
# def get_community_articles():
#     try:
#         # Fetch posts of the user
#         user_id = session.get('user_id')  # Assuming user is logged in and user ID is stored in session
#         cursor.execute("SELECT * FROM POSTS WHERE USER_ID = :user_id", {'user_id': user_id})
#         user_posts_data = cursor.fetchall()

#         # Fetch posts of the user's followers
#         cursor.execute("SELECT FOLLOWED_USER_ID FROM FOLLOWERS WHERE FOLLOWER_USER_ID = :user_id AND ACTIVE = 1", {'user_id': user_id})
#         follower_ids = [row[0] for row in cursor.fetchall()]

#         follower_posts_data = []
#         for follower_id in follower_ids:
#             cursor.execute("SELECT * FROM POSTS WHERE USER_ID = :follower_id", {'follower_id': follower_id})
#             follower_posts_data.extend(cursor.fetchall())

#         # Combine user posts and follower posts
#         community_articles = []
#         for post_data in user_posts_data + follower_posts_data:
#             post_id = post_data[0]
#             # Fetch likes for the post
#             cursor.execute("SELECT COUNT(*) FROM LIKES WHERE POST_ID = :post_id AND ACTIVE = 1", {'post_id': post_id})
#             likes_count = cursor.fetchone()[0]
#             # Fetch comments for the post
#             cursor.execute("SELECT COUNT(*) FROM COMMENTS WHERE POST_ID = :post_id", {'post_id': post_id})
#             comments_count = cursor.fetchone()[0]

#             # Fetch additional article details from ARTICLES table
#             cursor.execute("SELECT URL, IMAGE_URL, AUTHOR, PUBLISH_DATE, DESCRIPTION FROM ARTICLES WHERE ARTICLE_ID = :article_id", {'article_id': post_data[2]})
#             article_details = cursor.fetchone()

#             community_article = {
#                 'post_id': post_id,
#                 'user_id': post_data[1],
#                 'article_id': post_data[2],
#                 'publish_date': post_data[3],
#                 'title': post_data[4],
#                 'content': post_data[5],
#                 'likes_count': likes_count,
#                 'comments_count': comments_count,
#                 'article_url': article_details[0],
#                 'image_url': article_details[1],
#                 'author': article_details[2],
#                 'article_publish_date': article_details[3],
#                 'description': article_details[4]
#             }
#             community_articles.append(community_article)

#         return jsonify({'success': True, 'articles': community_articles})

#     except Exception as e:
#         return jsonify({'success': False, 'error': str(e)})
    
@app.route('/create-post', methods=['GET', 'POST'])
def handle_create_post():
    if request.method == 'GET':
        try:
            article_id = request.args.get('article_id')
            # Fetch article details from the database based on the provided article_id
            cursor.execute("SELECT * FROM ARTICLES WHERE ARTICLE_ID = :article_id", {'article_id': article_id})
            article_data = cursor.fetchone()

            if article_data:
                # Construct a dictionary containing article details
                article_details = {
                    'id': article_data[0],
                    'title': article_data[1],
                    'author': article_data[2],
                    'retrieved_date': article_data[3],
                    'publish_date': article_data[4],
                    'news_source': article_data[5],
                    'api_source': article_data[6],
                    'url': article_data[7],
                    'image_url': article_data[8],
                    'description': article_data[9],
                    'topic': article_data[10]
                }
                return jsonify(article_details)
            else:
                return jsonify({'error': 'Article not found'}), 404

        except Exception as e:
            return jsonify({'error': str(e)}), 500
    elif request.method == 'POST':
        try:
            data = request.json
            content = data.get('content')
            article_id = data.get('article_id')
            current_date = data.get('post_publish_date')
            user_id = data.get('user_id')

            # Convert the date string to a datetime object
            date_obj = datetime.strptime(current_date, '%Y-%m-%dT%H:%M:%S.%fZ')

            # Convert the datetime object back to a string in the desired format
            formatted_date = date_obj.strftime('%Y-%m-%d %H:%M:%S')

            cursor.execute("INSERT INTO POSTS (USER_ID, ARTICLE_ID, CONTENT, PUBLISH_DATE) VALUES (:user_id, :article_id, :content, :publish_date)", {'user_id': user_id, 'article_id': article_id, 'content': content, 'publish_date': date_obj})
            oracle_connection.commit()
            
            return jsonify({'success': True, 'message': 'Post created successfully'})

        except Exception as e:
            return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/submit-comment', methods=['POST'])
def submit_comment():
    try:
        data = request.json

        # Extract postId and content from the request data
        postId = data.get('postId')
        content = data.get('content')
        current_user_id = data.get('user_id')
        date_commented = data.get('comment_publish_date')

        # Convert the date string to a datetime object
        date_obj = datetime.strptime(date_commented, '%Y-%m-%dT%H:%M:%S.%fZ')

        # Convert the datetime object back to a string in the desired format
        formatted_date = date_obj.strftime('%Y-%m-%d %H:%M:%S')
        
        # Insert the comment into the database
        cursor.execute("INSERT INTO COMMENTS (USER_ID, POST_ID, CONTENT, DATE_COMMENTED) VALUES (:user_id, :post_id, :content, :date_commented)", {'user_id': current_user_id, 'post_id': postId, 'content': content, 'date_commented': date_obj})
        oracle_connection.commit()

        return jsonify({'success': True, 'message': 'Comment submitted successfully'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/get-comments', methods=['GET'])
def get_comments():
    try:
        # Extract the postId from the request
        post_id = request.args.get('postId')

        # Execute the query to fetch comments for the specified post
        cursor.execute("""
            SELECT CONTENT, DATE_COMMENTED, USERNAME
            FROM COMMENTS C
            INNER JOIN USERS U ON C.USER_ID = U.USER_ID
            WHERE POST_ID = :post_id
            ORDER BY DATE_COMMENTED DESC
        """, {'post_id': post_id})

        # Fetch all comments for the post
        comments_data = cursor.fetchall()

        # Construct a list of dictionaries containing comment details
        comments = []
        for comment in comments_data:
            comment_dict = {
                'content': comment[0],
                'date_commented': comment[1],
                'username': comment[2]
            }
            comments.append(comment_dict)

        return jsonify({'success': True, 'comments': comments})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/unfollow', methods=['POST'])
def unfollow():
    try:
        data = request.json
        follower_str = data.get('follower')
        following_str = data.get('following')

        cursor.execute("UPDATE followers SET active = 0 WHERE follower_user_id = :follower AND followed_user_id = :following", {'follower': follower_str, 'following': following_str})
        oracle_connection.commit()

        return jsonify({'success': True, 'message': 'User unfollowed'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/follow', methods=['POST'])
def follow():
    try:
        data = request.json
        follower_str = data.get('follower')
        following_str = data.get('following')

        print(follower_str, following_str)

        cursor.execute("SELECT * FROM followers WHERE follower_user_id = :follower AND followed_user_id = :following", {'follower': follower_str, 'following': following_str})
        follow_data = cursor.fetchone()

        if follow_data:
            cursor.execute("UPDATE followers SET active = 1 WHERE follower_user_id = :follower AND followed_user_id = :following", {'follower': follower_str, 'following': following_str})
            oracle_connection.commit()
        else:
            cursor.execute("INSERT INTO followers (follower_user_id, followed_user_id, active) VALUES (:follower, :following, 1)", {'follower': follower_str, 'following': following_str})
            oracle_connection.commit()

        return jsonify({'success': True, 'message': 'User followed'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/check_follow', methods=['POST'])
def check_follow():
    try:
        data = request.json
        follower_str = data.get('follower')
        following_str = data.get('following')

        cursor.execute("SELECT * FROM followers WHERE follower_user_id = :follower AND followed_user_id = :following AND active = 1", {'follower': follower_str, 'following': following_str})
        follow_data = cursor.fetchone()

        if follow_data:
            return jsonify({'success': True, 'following': True})
        else:
            return jsonify({'success': True, 'following': False})
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/get_user_interests', methods=['POST'])
def get_user_interests():
    try:
        data = request.json
        user_str = data.get('user')

        cursor.execute("SELECT topic FROM userinterests WHERE user_id = :user_id AND active = 1", {'user_id': user_str})
        follow_data = [row[0] for row in cursor.fetchall()]

        return jsonify({'success': True, 'interests': follow_data})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/remove_interest', methods=['POST'])
def remove_interest():
    try:
        data = request.json
        user_str = data.get('user')
        topic_str = data.get('topic')

        cursor.execute("UPDATE userinterests SET active = 0 WHERE user_id = :user_id AND topic = :topic", {'user_id': user_str, 'topic': topic_str})
        oracle_connection.commit()

        return jsonify({'success': True, 'message': 'Interest removed'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/add_interest', methods=['POST'])
def add_interest():
    try:
        data = request.json
        user_str = data.get('user')
        topic_str = data.get('topic')

        cursor.execute("SELECT * FROM userinterests WHERE user_id = :user_id AND topic = :topic", {'user_id': user_str, 'topic': topic_str})
        interest_data = cursor.fetchone()

        if interest_data:
            cursor.execute("UPDATE userinterests SET active = 1 WHERE user_id = :user_id AND topic = :topic", {'user_id': user_str, 'topic': topic_str})
            oracle_connection.commit()
        else:
            cursor.execute("INSERT INTO userinterests (user_id, topic, active) VALUES (:user_id, :topic, 1)", {'user_id': user_str, 'topic': topic_str})
            oracle_connection.commit()

        return jsonify({'success': True, 'message': 'Interest added'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/existing_users', methods=['POST'])
def existing_users():
    try:

        cursor.execute("SELECT username, email FROM users")
        user_data = [[row[0], row[1]] for row in cursor.fetchall()]

        usernames = [x[0] for x in user_data]
        emails = [x[1] for x in user_data]

        return jsonify({'success': True, 'usernames': usernames, 'emails': emails})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/like_post', methods=['POST'])
def like_post():
    try:
        data = request.json
        user_str = data.get('user')
        post_str = data.get('post')

        cursor.execute("SELECT * FROM likes WHERE user_id = :user_id AND post_id = :post_id", {'user_id': user_str, 'post_id': post_str})
        like_data = cursor.fetchone()

        if like_data:
            cursor.execute("UPDATE likes SET active = 1 WHERE user_id = :user_id AND post_id = :post_id", {'user_id': user_str, 'post_id': post_str})
            oracle_connection.commit()
        else:
            cursor.execute("INSERT INTO likes (user_id, post_id, active) VALUES (:user_id, :post_id, 1)", {'user_id': user_str, 'post_id': post_str})
            oracle_connection.commit()

        return jsonify({'success': True, 'message': 'Post liked'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    
@app.route('/unlike_post', methods=['POST'])
def unlike_post():
    try:
        data = request.json
        user_str = data.get('user')
        post_str = data.get('post')

        cursor.execute("UPDATE likes SET active = 0 WHERE user_id = :user_id AND post_id = :post_id", {'user_id': user_str, 'post_id': post_str})
        oracle_connection.commit()

        return jsonify({'success': True, 'message': 'Post unliked'})
    
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

    
if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=5000)
