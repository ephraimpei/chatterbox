from wtforms import Form, StringField, PasswordField, validators
from app.api.models.validations import check_if_username_taken

class RegistrationForm(Form):
    username = StringField('username', [
        validators.Required(),
        validators.Length(min=4, max=25),
        check_if_username_taken
    ])
    password = PasswordField('password', [
        validators.Required(),
        validators.EqualTo('confirm', message='Passwords must match'),
        validators.Length(min=4, max=25)
    ])
    confirm = PasswordField('confirm')
