from app import app
from flask import request, session, jsonify
from app.controllers import application_controller
from app.models import User
import pdb

@app.route("/api/session/post", methods=["POST"])
def create_session():
    username = request.form['username']
    password = request.form['password']

    user = User.find_by_username(username)[0]

    if user and User.validate_user_credentials(user, password):
        application_controller.login(user)

        return jsonify(username = user.username,
            message = "User creation successful! Welcome {0}".format(user.username))
    else:
        return jsonify(error="Could not validate user credentials.")

@app.route("/api/session/delete", methods=["DELETE"])
def destroy_session():
    application_controller.logout

    return jsonify(message="Goodbye {0}!".format(application_controller.current_user().username))
