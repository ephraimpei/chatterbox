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
    cookie = request.cookies.get('chatterbox')

    user = application_controller.current_user(cookie)

    if user:
        user_response = build_user_response_object(user)
        return jsonify(user=user_response)
    else:
        return jsonify(user={})

def __create_session():
    form = LoginForm(request.form)

    if form.validate():
        user = User.find_by_username(form.username.data)[0]
        print user.session_token
        application_controller.login(user)

        user_response = build_user_response_object(user)

        response = jsonify(user=user_response,
            message = "Login successful! Welcome {0}!".format(user.username))
        response.set_cookie('chatterbox', user.session_token)

        return response
    else:
        return jsonify(errors=form.errors.items()), 401

def __destroy_session():
    cookie = request.cookies.get('chatterbox')

    user = application_controller.current_user(cookie)

    application_controller.logout(cookie)

    response = jsonify(user=user, message="Goodbye {0}!".format(user.username))
    response.set_cookie('chatterbox', '', expires=0)

    return response
