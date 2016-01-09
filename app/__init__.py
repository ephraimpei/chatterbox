# from pyelasticsearch import ElasticSearch
#
# es = ElasticSearch('http://localhost:9200/')
#
# from app import views

from flask import Flask
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__, static_url_path="", static_folder="static")

app.config["MONGODB_SETTINGS"] = {'DB': "chatterbox_test"}
app.config["SECRET_KEY"] = "chatterbox_test_db"

db = MongoEngine(app)

from app.controller import *

if __name__ == '__main__':
    app.run()
