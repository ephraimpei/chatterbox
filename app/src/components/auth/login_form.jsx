import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import ApiSessionUtil from '../../apiutil/api_current_user_util.js';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        isValid: true,
        errors: [],
        username: "",
        password: "",
    };
  }

  handleLoginSubmission (e) {
    if (e) { e.preventDefault(); }

    $(".submit").addClass("disabled").prop("disabled", true);

    let formData = new FormData();

    formData.append("user[username]", this.state.username);
    formData.append("user[password]", this.state.password);

    ApiSessionUtil.login(formData, this.props.success, this.props.failure);
  }

  handleKeyPress (e) {
    if (e.charCode === 13) { this.handleLoginSubmission(); }
  }

  logIntoDemoAccount (e) {

  }

  changeUsername (e) {
    this.setState({ username: e.currentTarget.value });
  }

  changePassword (e) {
    this.setState({ password: e.currentTarget.value });
  }

  render() {
    let errors;

    if (this.isValid) { errors = this.state.errors; }

    return (
      <form className="login-form" onKeyPress={ this.handleKeyPress.bind(this) } onSubmit={ this.handleLoginSubmission.bind(this) }>
        <div className="login-error-wrapper">
          { errors }
        </div>

        <div className="login-form-wrapper">
          <button className="login-form-demo-account"
            onClick={ this.logIntoDemoAccount.bind(this) }>Demo Account</button>

          <label>Username
          <input
            className="login-form-username"
            type="text"
            onChange={ this.changeUsername.bind(this) }/>
          </label>

          <label>Password
          <input
            className="login-form-password"
            type="password"
            onChange={ this.changePassword.bind(this) }/>
          </label>

          <button className="submit" type="submit">Log In!</button>
          <Link to={ `/users/new` }>Create a user</Link>
        </div>
      </form>
    );
  }
}

export default LoginForm;
