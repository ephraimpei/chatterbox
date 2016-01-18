import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import ApiSessionUtil from '../../apiutil/api_session_util.js';

class LoginForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.logIntoDemoAccount = this.logIntoDemoAccount.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
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

    formData.append("username", this.state.username);
    formData.append("password", this.state.password);

    ApiSessionUtil.login(formData, this.props.success, this.props.failure);
  }

  handleKeyPress (e) {
    if (e.charCode === 13) { this.handleLoginSubmission(); }
  }

  logIntoDemoAccount (e) {
    e.preventDefault();
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
      <form className="login-form"
        onKeyPress={ this.handleKeyPress }
        onSubmit={ this.handleLoginSubmission }>
        <div className="login-error-wrapper">
          { errors }
        </div>

        <div className="login-form-wrapper">
          <button className="login-form-demo-account"
            onClick={ this.logIntoDemoAccount }>Demo Account</button>

          <label>Username
          <input
            className="login-form-username"
            type="text"
            onChange={ this.changeUsername }/>
          </label>

          <label>Password
          <input
            className="login-form-password"
            type="password"
            onChange={ this.changePassword }/>
          </label>

          <button className="submit" type="submit">Log In!</button>
          <Link to={ `/users/new` }>Create a user</Link>
        </div>
      </form>
    );
  }
}

export default LoginForm;
