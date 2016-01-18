from wtforms import Form, StringField, PasswordField, validators
from app.models.validations import duplicate_check

class RegistrationForm(Form):
    username = StringField('username', [
        validators.Required(),
        validators.Length(min=4, max=25),
        duplicate_check
    ])
    password = PasswordField('password', [
        validators.Required(),
        validators.EqualTo('confirm', message='Passwords must match'),
        validators.Length(min=4, max=25)
    ])
    confirm = PasswordField('confirm')
