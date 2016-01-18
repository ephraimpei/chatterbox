import React from 'react';
import LoginForm from './login_form.jsx';

class LoginPage extends React.Component {
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
      <div className="login-page">
        <h1>Welcome to Chatterbox!</h1>
        <h2>Please login to continue.</h2>
        <LoginForm success={ success } failure={ failure } errors={ errors }/>
      </div>
    );
  }
}

export default LoginPage;
