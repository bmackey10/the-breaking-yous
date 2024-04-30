from flask import Flask, jsonify, request
import cx_Oracle
import sys

app = Flask(__name__)

# Configure Oracle connection
oracle_connection = cx_Oracle.connect('guest/guest@localhost:1521/XE')

# Create a cursor to execute SQL queries
cursor = oracle_connection.cursor()

# Define routes
@app.route('/')
def index():
    return "Welcome to the Flask Server!"

# THIS ONE WORKS
@app.route('/login_user', methods=['GET'])
def login_user():
    try:

        cursor.execute("SELECT * FROM users WHERE username = :username and password = :password", {'username': request.args.get('username'), 'password': request.args.get('password')})
        user = cursor.fetchone()

        print("user: ", user, file=sys.stderr)
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

