from app import app
from flask import session, render_template, url_for, jsonify
from app.models import User
from app import db

@app.route("/user/new", methods=["GET"])
def new():
    return render_template("/user/new.html")

@app.route("/user/new", methods=["POST"])
def create():
    username = request.form['username']
    password = request.form['password']

    new_user = User(username = username)
    new_user.generate_password_digest(password)

    new_user.reset_session_token()

    if new_user.save():
        return redirect(url_for('show', username = new_user.username))
    else:
        return flask.jsonify(error="Could not create user.")

@app.route("/user/edit", methods=["GET"])
def edit():
    return render_template("/user/edit.html")

@app.route("/user/edit", methods=["PUT"])
def update():
    username = request.form['username']
    password = request.form['password']

    user = db.user.find_one({"username": username})

    if user and User.validate_user_credentials(user):
        new_username = request.form['new_username']
        new_password = request.form['new_password']

        user.username = new_username
        user.generate_password_digest(new_password)

        if new_user.save():
            return redirect(url_for('show', username = user.username))
        else:
            return flask.jsonify(error="Credentials are valid but could not update user.")
    else:
        return flask.jsonify(error="Could not validate user credentials.")

@app.route("/user/<username>", methods=["GET"])
def show(username):
    user = db.user.find_one({"username": username})

    return render_template("/user/show.html", user=user)
