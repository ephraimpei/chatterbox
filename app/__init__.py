import eventlet
from flask import Flask
from flask.ext.mongoengine import MongoEngine
from flask.ext.socketio import SocketIO

app = Flask(__name__, static_url_path="", static_folder="static")
socketio = SocketIO(app)

app.config["MONGODB_SETTINGS"] = {'DB': "chatterbox_test"}
app.config["SECRET_KEY"] = "whatitdo"

db = MongoEngine(app)

eventlet.monkey_patch()

from app.api.controllers import *
from app.api.controllers.json import *
