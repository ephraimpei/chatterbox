from app import app
from flask import request, session, render_template, url_for, jsonify
from app.models import User
from app import db
import pdb

@app.route("/api/users/post", methods=["POST"])
def create():
    username = request.form['user[username]']
    password = request.form['user[password]']

    new_user = User(username = username)
    new_user.generate_password_digest(password)

    new_user.reset_session_token()

    if new_user.save():
        return jsonify(username=username)
    else:
        return jsonify(error="Could not create user.")

@app.route("/api/users/<username>/put", methods=["PUT"])
def update(username):
    password = request.form['user[password]']
    option = request.form['user[option]']

    user = db.user.find_one({"username": username})

    if user and User.validate_user_credentials(user):
        updated_user = __update_user(user, option)

        user.username = new_username
        user.generate_password_digest(new_password)

        if updated_user.save():
            message = __generate_update_msg(option)
            return jsonify(username=username, message=message)
        else:
            return jsonify(error="Credentials are valid but could not update user.")
    else:
        return jsonify(error="Could not validate user credentials.")

@app.route("/api/users/<username>/delete", methods=["DELETE"])
def destroy(username):
    password = request.form['user[password]']

    user = db.user.find_one({"username": username})

    if user and User.validate_user_credentials(user):
        if db.user.remove({ username: username }, 1):
            return jsonify(username=username, message="User successfully deleted!")
        else:
            return jsonify(error="Credentials are valid but could not delete user.")
    else:
        return jsonify(error="Could not validate user credentials.")

def __updated_user(user, option):
    if option == "change username":
        updated_username = request.form['new_username']
        user.username = updated_username
        return user
    else:
        updated_password = request.form['new_password']
        user.generate_password_digest(updated_password)
        return user

def __generate_update_msg(option):
    if option == "change username":
        return "Username updated successfully!"
    else:
        return "Password updated successfully!"
