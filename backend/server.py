from flask import Flask, request, render_template, render_template_string
from flask import redirect, session
# from flask_mysqldb import MySQL
from flask import jsonify 
# from flask_cors import CORS
import logging
from threading import Thread
import getpass
import oracledb


# # Create a new flask instance
# app = Flask(__name__)
# logging.getLogger('flask_cors').level = logging.DEBUG
# CORS(app, resources={r"/toptracks": {"origins": "*"},
#                     r"/topartists": {"origins": "*"},
#                     r"/joingroup": {"origins": "*"},
#                     r"/creategroup": {"origins": "*"},
#                     r"/leavegroup": {"origins": "*"},
#                     r"/displaygroups": {"origin": "*"},
#                     r"/group/*": {"origin": "*"},
#                     r"/createDormParty/*": {"origin": "*"},
#                     r"/check-login-status": {"origin": "*"}})


# # Global headers variable
# headers = {}


# app.secret_key='mschmi26'


# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'mschmi26'
# app.config['MYSQL_PASSWORD'] = 'goirish'
# app.config['MYSQL_DB'] = 'chackl'


# mysql = MySQL(app)


# @app.route('/test')
# def test():
#    tracks = find_clusters(mysql, 1)
#    tracks = get_recommendations(headers, tracks)
#    create_rec_playlist(mysql, headers, tracks)
  
#    username='m2ji3ahws37nw58fkyo9sj294'
#    fv = get_user_feature_values(mysql, username)
#    fd = get_user_feature_diff(mysql, 1, username)
#    sta = shared_top_artists(mysql, 1)
#    ap = artists_pie(mysql, 1)
#    print("FV")
#    print(fv)
#    print("FD")
#    print(fd)
#    print("STA")
#    print(sta)
#    print("AP")
#    print(ap)


#    return 'works'


# @app.route('/')
# def home():
#    global headers
  
#    if 'Authorization' in headers:
#        # Get the username from get_user spotify API call
#        username = get_user(mysql, headers)
#        tracks, tracks_id = get_user_top_tracks(mysql, headers)
#        artists,artists_id = get_all_user_top_artists(mysql,headers)
#        #get_user_stats(mysql,headers)
#        # Select from the database to get the user display_name
#        cursor = mysql.connection.cursor()
#        cursor.execute("select display_name from Users where username = %s", (username,));
#        display_name = cursor.fetchall()[0][0]
#        cursor.close()


#        return (f'Hello {display_name}')
#    return 'Hello World'


# @app.route('/login')
# def login():
#     # login function redirects to callback screen after Spotify user authorization
#     return redirect(request_user_authorization())


# def thread_get_tracks():
#     global headers
#     global mysql

#     with app.app_context():

#         cur = mysql.connection.cursor()
#         get_user_top_tracks(mysql, headers, cur)
#         mysql.connection.commit()
#         cur.close()
#         print("tracks done!")
        
# def thread_get_artists():
#     global headers
#     global mysql

#     with app.app_context():

#         cur = mysql.connection.cursor()
#         get_all_user_top_artists(mysql, headers, cur)
#         mysql.connection.commit()
#         cur.close()
#         print("artists done!")


# @app.route('/check-login-status', methods=['GET'])
# def check_login_status():
#     global headers

#     # Perform the necessary checks to determine the login status
#     # This might involve checking if the user has a valid access token, session, etc.
    
#     # For demonstration purposes, let's assume you have a function that checks the login status
#     if 'Authorization' in headers:
#         print("HIHI")
#         return 'OK', 200
#     else:
#         print("UH OH")
#         return 'Unauthorized', 401


# @app.route('/callback')
# def callback():
#     # Use the user authorization to get an access code to get their personal data
#     #   from the Spotify API
#     global headers
#     headers = request_authcode_access_token(request.args.get('code'))

#     # Start a background thread to get top tracks and artists when the user logs in
#     thr = Thread(target=thread_get_tracks)
#     thr.start()

#     thr2 = Thread(target=thread_get_artists)
#     thr2.start()

#     return redirect('http://129.74.153.235:5029/')


# @app.route('/toptracks')
# def top_tracks():
#     global headers


#     if 'Authorization' in headers:
#        # Get the username from the get_user Spotify API call
#        username = get_user(mysql, headers)

#        # Get the user's top tracks
#        tracks, tracks_id, tracks_images = get_user_short_term_top_tracks(mysql, headers)
#        print(tracks)
#        print(tracks_images)

#        # Render a template or return the data in JSON format
#        return jsonify({'tracks': tracks, 'tracks_id': tracks_id, 'tracks_img': tracks_images})
    
#     return 'Hello World'


# @app.route('/topartists')
# def top_artists():
#    global headers


#    if 'Authorization' in headers:
#        # Get the username from the get_user Spotify API call
#        username = get_user(mysql, headers)

#        # Get the user's top tracks
#        artists, artists_id = get_user_short_term_top_artists(mysql, headers)

#        # Render a template or return the data in JSON format
#        return jsonify({'artists': artists, 'artists_id': artists_id})

#    return 'Hello World'


# @app.route('/joingroup', methods=['POST'])
# def join_group_route():
#    global headers
#    print(request.json)
#    if 'Authorization' not in headers:
#        return jsonify({"error": "Unauthorized"}), 401


#    g_id = request.json.get('group_id')  # Assuming the group_id is passed in the request JSON
#    if not g_id:
#        return jsonify({"error": "Group ID not provided"}), 400


#    # Call your join_group function here
#    result, message = join_group(mysql, headers, g_id)


#    if result:
#        return jsonify({"success": True, "message": message})
#    else:
#        return jsonify({"success": False, "error": message})
  


# @app.route('/creategroup', methods=['POST'])
# def create_group_route():
#    global headers


#    if 'Authorization' not in headers:
#        return jsonify({"error": "Unauthorized"}), 401


#    group_name = request.json.get('group_name')  # Assuming the group_name is passed in the request JSON
#    if not group_name:
#        return jsonify({"error": "Group name not provided"}), 400


#    # Call your create_group function here
#    result, message = create_group(mysql, headers, group_name)


#    if result:
#        return jsonify({"success": True, "message": message})
#    else:
#        return jsonify({"success": False, "error": message})
  


# @app.route('/leavegroup', methods=['POST'])
# def leave_group_route():
#    global headers


#    if 'Authorization' not in headers:
#        return jsonify({"error": "Unauthorized"}), 401


#    group_identifier = request.json.get('group_id')  # Assuming the group_id is passed in the request JSON
#    if not group_identifier:
#        return jsonify({"error": "Group ID not provided"}), 400


#    # Call your leave_group function here
#    result, message = leave_group(mysql, headers, group_identifier)


#    if result:
#        return jsonify({"success": True, "message": message})
#    else:
#        return jsonify({"success": False, "error": message})
  
# @app.route('/displaygroups')
# def display_groups_route():
#    global headers


#    if 'Authorization' not in headers:
#        return jsonify({"error": "Unauthorized"}), 401


#    # Call your display_groups function here
#    groups = display_groups(mysql, headers)
#    print(groups)


#    # Render a template or return the data in JSON format
#    return jsonify({'groups': groups})


# @app.route('/group/<int:group_id>')
# def display_group_info_route(group_id):
#     global headers
#     username = get_user(mysql, headers)


#     if 'Authorization' not in headers:
#         return jsonify({"error": "Unauthorized"}), 401


#     # Call your display_groups function here with the specific group_id
#     group = display_group_info(mysql, headers, group_id)
#     print(group)
#     features = get_user_feature_values(mysql, username)
#     feature_diff = get_user_feature_diff(mysql, group_id, username)
#     shared_artists = shared_top_artists(mysql, group_id)
#     shared_tracks_data = shared_top_tracks(mysql, group_id)
#     artist_pie = artists_pie(mysql, group_id)
#     members = get_group_display_names(mysql, group_id)
#     group_dict = {
#         'group_id': group[0],
#         'group_name': group[1],
#         'num_members': group[2],
#         'group_members': members,
#         'features': features[1:],
#         'feature_diff': feature_diff,
#     }
#     try:
#         group_dict['shared_artists'] = shared_artists  # Convert DataFrame to a list of dictionaries
#     except:
#         print("failed shared artists")
#         print(shared_artists)
#         group_dict['shared_artists'] = []

#     try:
#         group_dict['shared_tracks'] = shared_tracks_data
#     except:
#         print("failed shared tracks")
#         print(shared_tracks_data)
#         group_dict['shared_tracks'] = {}

#     try:
#         group_dict['artists_pie'] = artist_pie
#     except:
#         group_dict['artists_pie'] = {}
   
#     print(group)
#     print(group_dict)
#     return jsonify({'group': group_dict})

# @app.route('/createDormParty/<int:group_id>')
# def create_dorm_party_route(group_id):
#     global headers
#     username = get_user(mysql, headers)


#     if 'Authorization' not in headers:
#         return jsonify({"error": "Unauthorized"}), 401

#     tracks = find_clusters(mysql, group_id)

#     #tracks, track_ids = get_recommendations(headers, tracks)
#     #create_rec_playlist(mysql, headers, tracks, track_ids, group_id)
#     playlist, track_ids, track_names = get_recommendations(headers, tracks)
#     create_rec_playlist(mysql, headers, playlist, track_ids, track_names, group_id)
#     return "Success"




# if __name__ == '__main__':
#    # make changes in real time
#    app.debug = True


#    # run the application on port 5028 of the student machine
#    app.run(host='0.0.0.0', port=5028)