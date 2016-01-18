from app import app
from flask import send_from_directory

@app.errorhandler(404)
def page_not_found(error):
    return send_from_directory(app.static_folder, 'page_not_found.html'), 404

@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

@app.route("/")
@app.route("/users/new")
@app.route("/users/edit")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/users/<username>")
def show_user_profile(username):
    return send_from_directory(app.static_folder, "index.html")
