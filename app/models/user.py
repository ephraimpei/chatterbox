from flask import url_for
from app import db
import bcrypt

class User(db.Document):
    username = db.StringField(max_length=255, required=True)
    password_digest = db.StringField(max_length=255, required=True)
    session_token = db.StringField(max_length=255, required=True)
    friends = db.ListField(db.EmbeddedDocumentField('User'))

    def get_absolute_url(self):
        return url_for('user', kwargs={"username": self.username})

    meta = {
        'allow_inheritance': True,
        'indexes': ['username', 'session_token'],
        'ordering': ['+username']
    }
