from flask import Flask

app = Flask(__name__)

from pyelasticsearch import ElasticSearch

es = ElasticSearch('http://localhost:9200/')

from app import views
