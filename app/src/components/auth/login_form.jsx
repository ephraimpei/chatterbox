import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isValid: true,
        errors: [],
        username: "",
        password: ""
    };
  }

  goToSignUpPage () {
    this.history.pushState(null, "/users/new");
  }

  handleLoginSubmission (e) {

  }

  handleKeyPress (e) {

  }

  logIntoDemoAccount (e) {

  }

  updateUsername (e) {
    // this.setState({
    //   username: e.target.value
    // });
  }

  updatePassword (e) {
    // this.setState({
    //   password: e.target.value
    // });
  }

  render() {
    let errors;

    if (this.isValid) { errors = this.state.errors; }

    return (
      <form className={this.props.klass} onKeyPress={this.handleKeyPress} onSubmit={this.handleLoginSubmission}>
        <div className="login-error-wrapper">
          { errors }
        </div>

        <div className="login-form-wrapper">
          <button className="login-form-demo-account"
            onClick={this.logIntoDemoAccount}>Demo Account</button>

          <label>Username
          <input
            className="login-form-username"
            type="text"
            onChange={this.updateUsername("username")}/>
          </label>

          <label>Password
          <input
            className="login-form-password"
            type="password"
            onChange={this.updatePassword("password")}/>
          </label>

          <button className="submit" type="submit">Log In!</button>
          <button onClick={this.goToSignUpPage}>Sign Up</button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
