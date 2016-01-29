from flask import Flask
from flask.ext.mongoengine import MongoEngine
from flask.ext.socketio import SocketIO, emit

app = Flask(__name__, static_url_path="", static_folder="static")
socketio = SocketIO(app)

app.config["MONGODB_SETTINGS"] = {'DB': "chatterbox_test"}
app.config["SECRET_KEY"] = "whatitdo"

db = MongoEngine(app)

from app.api.controllers import *
from app.api.controllers.json import *
