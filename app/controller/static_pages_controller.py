from app import app
from flask import send_from_directory

@app.after_request
def add_header(response):
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response

@app.route("/")
@app.route("/users/new")
@app.route("/users/edit")
@app.route("/user/<username>")
def index():
    return send_from_directory(app.static_folder, "index.html")
