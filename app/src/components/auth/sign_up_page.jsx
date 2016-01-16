import React from 'react';
import SignUpForm from './sign_up_form.jsx';

require("../../../static/stylesheets/sass/components/_sign_up_page.scss");

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state={ isValid: true };
  }

  render () {
    let errors;

    let success = function () {
      this.props.history.pushState(null,'/');
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
