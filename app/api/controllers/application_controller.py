from flask import session
from app.api.models import User
import pdb

def current_user():
    if 'uid' not in session:
        session['uid'] = None
        return None
    elif session['uid']:
        return User.find_by_session_token(session['uid'])[0]
    else:
        return None

def login(user):
    session['uid'] = user.reset_session_token()
    user.save()

def logout():
    current_user().reset_session_token()
    session['uid'] = None

def logged_in():
    if current_user():
        return True
    else:
        return False
