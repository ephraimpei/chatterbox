from app import app
from flask import request, session, jsonify
from app.controllers import application_controller
from app.models import User
from app.models.forms import LoginForm
from app.mixins import *
import pdb

@app.route("/api/session/get", methods=["GET"])
def fetch_session():
    if application_controller.logged_in():
        user = application_controller.current_user()
        user_response = build_user_response_object(user)
        return jsonify(user=user_response)
    else:
        return jsonify({})

@app.route("/api/session/post", methods=["POST"])
def create_session():
    form = LoginForm(request.form)

    if form.validate():
        user = User.find_by_username(form.username.data)[0]

        application_controller.login(user)

        user_response = build_user_response_object(user)

        return jsonify(user=user_response,
            message = "Login successful! Welcome {0}!".format(user.username))
    else:
        return jsonify(errors=form.errors.items()), 401

@app.route("/api/session/delete", methods=["DELETE"])
def destroy_session():
    application_controller.logout

    return jsonify(message="Goodbye {0}!".format(application_controller.current_user().username))
