from app import app
from flask import request, session, jsonify
from app.controller import application_controller
from app import db
import pdb

@app.route("/api/session/post", methods=["POST"])
def create_session():
    username = request.form['user[username]']
    password = request.form['user[password]']

    user = db.user.find_one({ "username": username })

    if user and User.validate_user_credentials(user):
        application_controller.login(user)

        return jsonify(message="Login successful! Welcome {0}".format(user.username))
    else:
        return jsonify(error="Could not validate user credentials.")

@app.route("/api/users/delete", methods=["DELETE"])
def destroy_session():
    application_controller.logout

    return jsonify(message="Goodbye {0}!".format(application_controller.current_user().username))
