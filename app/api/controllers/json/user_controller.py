from app import app
from flask import request, session, jsonify
from app.api.models import User
from app.api.models.forms import RegistrationForm
from app.api.controllers import application_controller
from app.api.utilities import *
import pdb

@app.route("/users/api/<username>/<mode>", methods=["GET", "PUT", "DELETE"])
def handle_user_api_request(username, mode):
    if request.method == "GET":
        return __fetch_users(username, mode)
    elif request.method == "PUT":
        return __update_user(username)
    elif request.method == "DELETE":
        return __destroy_user(username)

@app.route("/users/api", methods=["POST"])
def create_user():
    form = RegistrationForm(request.form)

    if form.validate():
        new_user = User(username = form.username.data)
        new_user.generate_password_digest(form.password.data)
        new_user.reset_session_token()

        if new_user.save():
            application_controller.login(new_user)

            user_response = build_user_response_object(new_user)

            return jsonify(user = user_response,
                message = "User creation successful! Welcome {0}!".format(new_user.username))
        else:
            return jsonify(error="Could not create user."), 401
    else:
        return jsonify(errors=form.errors.items()), 400

def __fetch_users(username, mode):
    if mode == "autocomplete-selection" or mode == "autocomplete-input":
        users = User.objects.filter(username__icontains=username).only('username')[:5]
    else:
        users = application_controller.logged_in_users()

    return jsonify(users = users)

def __update_user(username):
    password = request.form['password']
    option = request.form['option']

    user = User.find_by_username(username)[0]

    if user and User.validate_user_credentials(user, password):
        updated_user = __updated_user(user, option)

        user.username = new_username
        user.generate_password_digest(new_password)

        if updated_user.save():
            message = __generate_update_msg(option)
            return jsonify(username=username, message=message)
        else:
            return jsonify(error="Credentials are valid but could not update user.")
    else:
        return jsonify(error="Could not validate user credentials.")

def __destroy_user(username):
    password = request.form['password']

    user = User.find_by_username(username)[0]

    if user and User.validate_user_credentials(user, password):
        if User.destroy(user):
            return jsonify(message="User {0} successfully deleted!".format(user.username))
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
