from app import db
import uuid

class Session(db.Document):
    username = db.StringField(max_length=255, required=True)
    session_token = db.StringField(max_length=255, required=True)

    @classmethod
    def generate_session_token(cls):
        return str(uuid.uuid1())

    @classmethod
    def find_by_session_token(cls, session_token):
        return User.objects(session_token = session_token)

    @classmethod
    def destroy(cls, session):
        if session.delete():
            return True
        else:
            return False

    def reset_session_token(self):
        self.session_token = Session.generate_session_token()
        self.save()
        return self.session_token

    def __repr__(self):
        return '<session {0}><username {1}>'.format(self.session_token, self.username)

    meta = {
        'indexes': ['session_token']
    }
