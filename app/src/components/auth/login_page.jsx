import React from 'react';
import $ from 'jquery';
import LoginForm from './login_form.jsx';
import currentUserStore from '../../stores/current_user_store.js';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.successfulLogin = this.successfulLogin.bind(this);
    this.failedLogin = this.failedLogin.bind(this);
    this.deleteUsernameErrors = this.deleteUsernameErrors.bind(this);
    this.deletePasswordErrors = this.deletePasswordErrors.bind(this);
    this.__checkIfLoggedIn = this.__checkIfLoggedIn.bind(this);
    this.state={ usernameErrors:[], passwordErrors:[] };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    this.__checkIfLoggedIn();
  }

  componentDidMount () {
    currentUserStore.addChangeListener(this.__checkIfLoggedIn);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this.__checkIfLoggedIn);
  }

  successfulLogin (message, username) {
    this.context.router.push('/users/' + username);

    $('#flash').text(message);

    $('#flash').delay(500).fadeIn('normal', function() {
      $(this).delay(2500).fadeOut();
    });
  }

  failedLogin (errors) {
    $(".submit").removeClass("disabled").prop("disabled", false);

    let [usernameErrors, passwordErrors] = [[], []];

    errors.forEach (function (err) {
      switch (err[0]) {
        case "username":
          usernameErrors.push(err[1][0]);
          $(".login-form-username-input").addClass("invalid");
          break;
        case "password":
          passwordErrors.push(err[1][0]);
          if (!$(".login-form-password-input").hasClass("invalid")) {
            $(".login-form-password-input").addClass("invalid");
          }
          break;
      }
    });

    this.setState({
      usernameErrors: usernameErrors,
      passwordErrors: passwordErrors
    });
  }

  deleteUsernameErrors () {
    this.setState({ usernameErrors: [] })
  }

  deletePasswordErrors () {
    this.setState({ passwordErrors: [] })
  }

  __checkIfLoggedIn() {
    if (currentUserStore.isLoggedIn()) {
      this.context.router.push('/users/' + currentUserStore.getCurrentUser().username);
    }
  }

  render () {
    return (
      <div className="login-page">
        <h1>Welcome to Chatterbox!</h1>
        <h2>Please login to continue.</h2>
        <LoginForm success={ this.successfulLogin }
          failure={ this.failedLogin }
          usernameErrors={ this.state.usernameErrors }
          passwordErrors={ this.state.passwordErrors }
          deleteUsernameErrors={ this.deleteUsernameErrors }
          deletePasswordErrors={ this.deletePasswordErrors }/>
      </div>
    );
  }
}

export default LoginPage;
