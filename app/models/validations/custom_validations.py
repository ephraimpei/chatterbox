from app.models import User
from wtforms import ValidationError
import pdb

def duplicate_check(form, field):
    message = "Username already taken"

    if User.objects(username = form.username.data).count() > 0:
        raise ValidationError(message)
