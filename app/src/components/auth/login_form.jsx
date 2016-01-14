import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isValid: true,
        errors: [],
        username: "",
        password: "",
        imageUrl: null,
        imageFile: ""
    };
  }

  handleLoginSubmission (e) {

  }

  handleKeyPress (e) {

  }

  logIntoDemoAccount (e) {

  }

  changeUsername (e) {
    // this.setState({
    //   username: e.currentTarget.value
    // });
  }

  changePassword (e) {
    // this.setState({
    //   password: e.currentTarget.value
    // });
  }

  render() {
    let errors;

    if (this.isValid) { errors = this.state.errors; }

    return (
      <form className="login-form" onKeyPress={this.handleKeyPress} onSubmit={this.handleLoginSubmission}>
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
          <button><Link to={ `/users/new` }>Sign Up</Link></button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
