from flask import Flask, jsonify, request, session
import cx_Oracle
import sys
from flask_login import LoginManager, UserMixin, current_user, login_user, logout_user
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import timedelta, datetime
import random

sys.path.append("sqlcommands/commands")
from algorithm import simulate_recommendation_algorithm as user_recs
#from werkzeug.security import generate_password_hash



app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "oracle+cx_oracle://guest:guest@172.22.134.159:1521/XE"
app.config["SECRET_KEY"] = '4d53112ca3f996eaf5572fb3eb7f9eeb4771fea4f0039d5a8f8d133959b14609'
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=1)
CORS(app, resources={r"/login": {"origins": "*"},
                     r"/register": {"origins": "*"}
                                            
                                            })


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


# Configure Oracle connection
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

    data = request.json
    user_str = data.get('username')
    pass_str = data.get('password')

    if request.method == "POST":
        user = Users.query.filter_by(username=user_str).first()

        if user.password == pass_str:
            login_user(user, remember=True)
            session['username'] = user_str
            print('Logged in successfully.', file=sys.stderr)


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
        # Perform validation if needed
        if not username or not password or not firstName or not lastName or not birthDate or not phoneNumber or not email or not country:
            return jsonify({'success': False, 'error': 'All fields are required'}), 400

        # Hash the password
        #hashed_password = generate_password_hash(password)


        try:
            # Convert birthDate to the required format
            birthDate_formatted = datetime.strptime(birthDate, '%m/%d/%Y').strftime('%d-%b-%y')
            
            query = "INSERT INTO users (username, password, first_name, last_name, birth_date, phone_number, email, country) VALUES (:username, :password, :first_name, :last_name, TO_DATE(:birth_date, 'DD-MON-YY'), :phone_number, :email, :country)"
            cursor.execute(query, {'username': username, 'password': password, 'first_name': firstName, 'last_name': lastName, 'birth_date': birthDate_formatted, 'phone_number': phoneNumber, 'email': email, 'country': country})
            oracle_connection.commit()
            print("User inserted successfully.")
        except Exception as e:
            print("Error occurred while inserting user:", e)
            oracle_connection.rollback()  # Rollback the transaction in case of error


        
        print("whoa")

        return jsonify({'success': True, 'message': 'User registered successfully'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})


@app.route('/for-you', methods=['POST'])
def recommed_six_artcles():
    try:
        #REPLACE THIS LINE WITH A REAL USER
        sample_user = 1

        #GET TODAYS DATE
        date = datetime.now()
        date = str(date.strftime('%d-%b-%y')).upper()

        #GET USER INTERESTS
        topics_query = f"SELECT topic from userinterests where user_id = {sample_user}"
        cursor.execute(topics_query)
        topics = [row[0] for row in cursor.fetchall()]

        
        #Get recommended articles for today from articles and move them to userarticles table
        #This probably needs to also happen once a year but idk where to put this just yet - leaving it commented out for now
        '''
        #GET RECOMMENDED ARTICLES FROM TODAY
        article_ids = []
        for topic in topics:
            article_scrape = f"select article_id from (select distinct title, article_id from articles where topic = '{topic}' and TO_CHAR(retrieved_date, 'DD-MON-YY') = '{date}')"
            cursor.execute(article_scrape)
            ids = [row[0] for row in cursor.fetchall()]
            #topics = [row[1] for row in cursor.fetchall()]
            article_ids.extend(ids)
        print(article_ids)
        print(topics)

        #PUT RECOMMENDED ARTICLES IN THE USERARTICLES TABLE (DO THIS ONCE)
        
        for aid in article_ids:
            get_topic = f"select topic from articles where article_id = {aid}"
            cursor.execute(get_topic)
            temp = cursor.fetchone()[0]
            print(temp)
            print(sample_user)
            print(aid)
            userarticles_insert = f"INSERT INTO userarticles(user_id, article_id,topic, displayed) values({sample_user},{aid},'{temp}',0)"
            cursor.execute(userarticles_insert)
        '''

        #Recommend 6 articles (repeat this on a daily basis? or when the user presses a "more button"? tbd
    
        recs = []
        while len(recs) < 6:
            random.shuffle(topics)
            for topic in topics:
                #get a random article for the current topic
                get_rec_query = f"SELECT article_id FROM ((select article_id FROM userarticles WHERE topic = '{topic}' and user_id = {sample_user} and displayed = 0) ORDER BY DBMS_RANDOM.VALUE) WHERE ROWNUM <= 1"
                cursor.execute(get_rec_query)
                rec = cursor.fetchone()[0]

                #mark that article as displayed
                update_rec = f"UPDATE userarticles set displayed = 1 where article_id = {rec}"
                cursor.execute(update_rec)

                #add new recommendation id to recs array
                recs.append(rec)

                if len(recs) >= 6:
                    break

        recs = recs[:6]

        return jsonify({'success': True, 'recommendations': recs})
        return jsonify({'success': True, 'message': 'FYP ids collected successfully'})

    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})
    


if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=8022)

