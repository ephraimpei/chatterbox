import React from 'react';
import LoginForm from './login_form.jsx';
import currentUserStore from '../../stores/current_user_store.js';
import { displayFlashMessage } from '../../utilities/flash.js';
import { failedAuthErrors } from '../../utilities/auth.js';

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

    displayFlashMessage(message);
  }

  failedLogin (errors) {
    const [usernameErrors, passwordErrors] = failedAuthErrors(errors);

    this.setState({ usernameErrors, passwordErrors });
  }

  deleteUsernameErrors () {
    this.setState({ usernameErrors: [] })
  }

  deletePasswordErrors () {
    this.setState({ passwordErrors: [] })
  }

  __checkIfLoggedIn() {
    if (currentUserStore.isLoggedIn()) {
      this.context.router.push('/users/' + currentUserStore.get().username);
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
