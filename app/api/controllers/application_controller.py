from flask import session
from app.api.models import User
import pdb

def current_user(cookie):
    if not session:
        return None
    else:
        for token in session:
            if cookie == token and User.find_by_session_token(token):
                return User.find_by_session_token(token)[0]
        return None

def login(user):
    session[user.reset_session_token()] = user.username

def logout(cookie):
    current_user(cookie).reset_session_token()
    session.pop(cookie, None)

def logged_in_users():
    users = []

    for token in session:
        user = User.find_by_session_token(token)
        if user:
            users.append(user[0].username)

    return users
