from app.api.models import User
from wtforms import ValidationError
import pdb

def check_if_username_taken(form, field):
    message = "Username already taken"

    if User.find_by_username(form.username.data).count() > 0:
        raise ValidationError(message)

def check_if_username_exists(form, field):
    message = "Username not found"

    if User.find_by_username(form.username.data).count() == 0:
        raise ValidationError(message)

def validate_user_credentials(form, field):
    if User.find_by_username(form.username.data).count() > 0:
        user = User.find_by_username(form.username.data)[0]
    else:
        return

    if not User.validate_user_credentials(user, form.password.data):
        message = "Invalid credentials"
        raise ValidationError(message)
