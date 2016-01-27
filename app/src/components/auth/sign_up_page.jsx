import React from 'react';
import SignUpForm from './sign_up_form.jsx';
import { displayFlashMessage } from '../../utilities/flash.js';
import { failedAuthErrors } from '../../utilities/auth.js';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.successfulSignUp = this.successfulSignUp.bind(this);
    this.failedSignUp = this.failedSignUp.bind(this);
    this.deleteUsernameErrors = this.deleteUsernameErrors.bind(this);
    this.deletePasswordErrors = this.deletePasswordErrors.bind(this);
    this.state={ usernameErrors:[], passwordErrors:[] };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  successfulSignUp (message, username) {
    this.context.router.push('/users/' + username);

    displayFlashMessage(message);
  }

  failedSignUp (errors) {
    let [usernameErrors, passwordErrors] = failedAuthErrors(errors);

    this.setState({ usernameErrors, passwordErrors });
  }

  deleteUsernameErrors () {
    this.setState({ usernameErrors: [] })
  }

  deletePasswordErrors () {
    this.setState({ passwordErrors: [] })
  }

  render () {
    return (
      <div className="sign-up-page">
        <h1>Welcome to Chatterbox!</h1>
        <h2>Create a new user to get going!</h2>
        <SignUpForm success={ this.successfulSignUp }
          failure={ this.failedSignUp }
          usernameErrors={ this.state.usernameErrors }
          passwordErrors={ this.state.passwordErrors }
          deleteUsernameErrors={ this.deleteUsernameErrors }
          deletePasswordErrors={ this.deletePasswordErrors }/>
      </div>
    );
  }
}

export default SignUpPage;
