# from pyelasticsearch import ElasticSearch
#
# es = ElasticSearch('http://localhost:9200/')
#
# from app import views

from flask import Flask
from flask.ext.mongoengine import MongoEngine
from flask.ext.assets import Environment, Bundle

app = Flask(__name__, static_url_path="", static_folder="static")

app.config["MONGODB_SETTINGS"] = {'DB': "chatterbox_test"}
app.config["SECRET_KEY"] = "chatterbox_test_db"

db = MongoEngine(app)

from app.controller import *

assets = Environment(app)
assets.url = app.static_url_path
scss = Bundle('stylesheets/sass/main.scss',
    depends='stylesheets/sass/main.scss',
    filters='pyscss',
    output='stylesheets/css/main.css')
assets.register('scss_all', scss)

if __name__ == '__main__':
    app.run()
