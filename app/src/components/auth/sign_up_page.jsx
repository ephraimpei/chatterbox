import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import SignUpForm from './sign_up_form.jsx';

require("../../../static/stylesheets/sass/components/_sign_up_page.scss");

class SignUpPage extends React.Component {
  render () {
    return (
      <div className="sign-up-page">
        <h1>Welcome to Chatterbox!</h1>
        <h2>Create a new user to get going!</h2>
        <SignUpForm />
      </div>
    );
  }
}

export default SignUpPage;
