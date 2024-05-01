from flask import Flask, jsonify, request
import cx_Oracle
import sys
from flask_login import LoginManager, UserMixin, current_user, login_user
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "oracle+cx_oracle://guest:guest@i-058e93772ad5aab46.aws.nd.edu:1521/XE"
app.config["SECRET_KEY"] = '4d53112ca3f996eaf5572fb3eb7f9eeb4771fea4f0039d5a8f8d133959b14609'
CORS(app, resources={r"/": {"/login": "*"}})


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
oracle_connection = cx_Oracle.connect('guest/guest@localhost:1521/XE')


# Create a cursor to execute SQL queries
cursor = oracle_connection.cursor()


# Define routes
@app.route('/')
def index():
   return "Welcome to the Flask Server!"


@login_manager.user_loader
def loader_user(user_id):
   return Users.query.get(user_id)


# is_authenticated: a property that is True if the user has valid credentials or False otherwise.
# is_active: a property that is True if the user's account is active or False otherwise.
# is_anonymous: a property that is False for regular users, and True only for a special, anonymous user.
# get_id(): a method that returns a unique identifier for the user as a string.


# THIS ONE WORKS
@app.route('/login', methods=['POST'])
def login():

    data = request.json
    user_str = data.get('username')
    pass_str = data.get('password')

    if request.method == "POST":
        user = Users.query.filter_by(username=user_str).first()

        if user.password == pass_str:
            login_user(user)
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


@app.route("/logout")
def logout():
   logout_user()
   return jsonify({'success': True})


@app.route("/get_current_user", methods=['POST'])
def get_current_user():
    return jsonify({'authenticated': current_user.is_authenticated, 'user_id': current_user.user_id, 'username': current_user.username, 'firstName': current_user.first_name, 'lastName': current_user.last_name, })


@app.route('/register', methods=['POST'])
def register_user():
   try:
       # Get data from request
       data = request.json
       username = data.get('username')
       password = data.get('password')
       first_name = data.get('first_name')
       last_name = data.get('last_name')
       birth_date = data.get('birth_date')
       phone_number = data.get('phone_number')
       email = data.get('email')
       country = data.get('country')


       # Perform validation if needed
      
       # Insert user data into database
       query = "INSERT INTO users (username, password, first_name, last_name, birth_date, phone_number, email, country) VALUES (:1, :2, :3, :4, TO_DATE(:5, 'MM/DD/YYYY'), :6, :7, :8)"
       cursor.execute(query, (username, password, first_name, last_name, birth_date, phone_number, email, country))
       oracle_connection.commit()


       return jsonify({'success': True, 'message': 'User registered successfully'})


   except Exception as e:
       return jsonify({'success': False, 'error': str(e)})
  
# API to fetch all users
@app.route('/users', methods=['GET'])
def get_all_users():
   try:
       query = "SELECT * FROM users"
       cursor.execute(query)
       users = cursor.fetchall()
      
       user_data = []
       for user in users:
           user_data.append({
               'user_id': user[0],
               'username': user[1],
               'first_name': user[3],
               'last_name': user[4],
               'email': user[6],
               'phone_number': user[5],
               'birth_date': user[2],
               'country': user[7]
           })


       return jsonify({'success': True, 'users': user_data})


   except Exception as e:
       return jsonify({'success': False, 'error': str(e)})


# API to fetch user by username
@app.route('/users/<username>', methods=['GET'])
def get_user_by_username(username):
   try:
       query = "SELECT * FROM users WHERE username = :1"
       cursor.execute(query, (username,))
       user = cursor.fetchone()
      
       if user:
           user_data = {
               'user_id': user[0],
               'username': user[1],
               'first_name': user[3],
               'last_name': user[4],
               'email': user[6],
               'phone_number': user[5],
               'birth_date': user[2],
               'country': user[7]
           }
           return jsonify({'success': True, 'user': user_data})
       else:
           return jsonify({'success': False, 'message': 'User not found'})


   except Exception as e:
       return jsonify({'success': False, 'error': str(e)})


if __name__ == '__main__':
   app.run(debug=True, host='0.0.0.0', port=8022)

