import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import $ from 'jquery';
import ApiUserUtil from '../../apiutil/api_user_util.js';

class SignUpForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        isValid: true,
        errors: [],
        username: "",
        password: ""
    };
  }

  handleSignUpSubmission (e) {
    if (e) { e.preventDefault(); }

    $(".submit").addClass("disabled").prop("disabled", true);

    let formData = new FormData();

    formData.append("user[username]", this.state.username);
    formData.append("user[password]", this.state.password);
    formData.append("user[avatar]", this.state.imageFile);

    let success = function () {
      this.history.goBack();
    }.bind(this);

    let failure = function (errors) {
      $(".submit").removeClass("disabled").prop("disabled", false);

      this.setState({
        isValid: false,
        errors: errors
      });
    }.bind(this);

    ApiUserUtil.create(formData, success, failure);
  }

  handleKeyPress (e) {
    if (e.charCode === 13) { this.handleSignUpSubmission(); }
  }

  changeUsername (e) {
    this.setState({ username: e.currentTarget.value });
  }

  changePassword (e) {
    this.setState({ password: e.currentTarget.value });
  }

  changeFile (e) {
    let reader = new FileReader();
    let file = e.currentTarget.files[0];

    reader.onloadend = function() {
      this.setState({ imageUrl: reader.result, imageFile: file });
    }.bind(this);

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", imageFile: null });
    }
  }

  render() {
    let errors;

    if (this.isValid) { errors = this.state.errors; }

    return (
      <form className="sign-up-form" onKeyPress={this.handleKeyPress.bind(this)} onSubmit={ this.handleSignUpSubmission.bind(this) }>
        <div className="sign-up-error-wrapper">
          { errors }
        </div>

        <div className="sign-up-form-wrapper">
          <label>Username
          <input
            className="sign-up-form-username"
            type="text"
            onChange={ this.changeUsername.bind(this) }/>
          </label>

          <label>Password
          <input
            className="sign-up-form-password"
            type="password"
            onChange={ this.changePassword.bind(this) }/>
          </label>

          <label>Avatar Upload
          <input
            className="sign-up-form-avatar"
            type="file"
            onChange={ this.changeFile.bind(this) }/>
          </label>

          <img className="sign-up-form-avatar-preview" src={ this.state.imageUrl } />

          <button className="submit" type="submit">Sign Up!</button>
          <Link to={ `/` }>Already have an account?</Link>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
