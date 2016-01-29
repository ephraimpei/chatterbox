from app import app
from flask import request, session, jsonify
from app.api.controllers import application_controller
from app.api.models import User
from app.api.models.forms import LoginForm
from app.api.utilities import *
import pdb

@app.route("/session", methods=["GET", "POST", "DELETE"])
def handle_session_api_request():
    if request.method == "GET":
        return __fetch_session()
    elif request.method == "POST":
        return __create_session()
    elif request.method == "DELETE":
        return __destroy_session()

def __fetch_session():
    if application_controller.logged_in():
        user = application_controller.current_user()
        user_response = build_user_response_object(user)
        return jsonify(user=user_response)
    else:
        return jsonify(user={})

def __create_session():
    form = LoginForm(request.form)

    if form.validate():
        user = User.find_by_username(form.username.data)[0]

        application_controller.login(user)

        user_response = build_user_response_object(user)

        return jsonify(user=user_response,
            message = "Login successful! Welcome {0}!".format(user.username))
    else:
        return jsonify(errors=form.errors.items()), 401

def __destroy_session():
    user = application_controller.current_user() \
        if application_controller.logged_in() \
        else None

    application_controller.logout()

    return jsonify(user=user, message="Goodbye {0}!".format(user.username))
