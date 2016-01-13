from flask import url_for
from app import db
import datetime

class Message(db.EmbeddedDocument):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    sender = db.StringField(max_length=255, required=True)
    receiver = db.StringField(max_length=255, required=True)
    body = db.StringField(max_length=255, required=True)
