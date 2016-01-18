from flask import session

def current_user():
    if session['uid']:
        return User.find_by_session_token(session['uid'])
    else:
        return None

def login(user):
    session['uid'] = user.reset_session_token
    user.save()

def logout():
    current_user().reset_session_token
    session['uid'] = None

def logged_in():
    if current_user():
        return True
    else:
        return False
