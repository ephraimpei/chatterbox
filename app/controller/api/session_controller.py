from app import app
from flask import render_template
from app.controller import application_controller

@app.route("/api/session/post", methods=["POST"])
def create():
    username = request.form['user[username]']
    password = request.form['user[password]']

    user = db.user.find_one({"username": username})

    if user and User.validate_user_credentials(user):
        application_controller.login(user)

        if updated_user.save():
            message = __generate_update_msg(option)
            return jsonify(username=username, message=message)
        else:
            return jsonify(error="Credentials are valid but could not update user.")
    else:
        return jsonify(error="Could not validate user credentials.")

@app.route("/api/users/delete", methods=["DELETE"])
def destroy():
