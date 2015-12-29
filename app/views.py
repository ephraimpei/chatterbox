from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
def index():
    user = {"nickname": "Ephraim"}
    return render_template("index.html", title="Chatterbox", user=user)
