import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import LoginForm from './login_form.jsx';

require("../../../static/stylesheets/sass/components/_login_page.scss");

class LoginPage extends React.Component {
  render () {
    return (
      <div className="login-page">
        <div className="login-form">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
