from wtforms import Form, StringField, PasswordField, validators
from app.api.models.validations import check_if_username_exists, validate_user_credentials

class LoginForm(Form):
    username = StringField('username', [
        validators.Required(),
        check_if_username_exists
    ])
    password = PasswordField('password', [
        validators.Required(),
        validate_user_credentials
    ])
