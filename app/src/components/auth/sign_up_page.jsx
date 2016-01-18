import React from 'react';
import SignUpForm from './sign_up_form.jsx';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={ isValid: true };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render () {
    let errors;

    let success = function (username) {
      this.context.router.push('/users/' + username);
    }.bind(this);

    let failure = function (errors) {
      $(".submit").removeClass("disabled").prop("disabled", false);
      this.setState({ isValid: false });
      errors = errors;
    }.bind(this);

    return (
      <div className="sign-up-page">
        <h1>Welcome to Chatterbox!</h1>
        <h2>Create a new user to get going!</h2>
        <SignUpForm success={ success } failure={ failure } errors={ errors }/>
      </div>
    );
  }
}

export default SignUpPage;
