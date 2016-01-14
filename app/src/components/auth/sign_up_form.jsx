import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isValid: true,
        errors: [],
        username: "",
        password: ""
    };
  }

  handleSignUpSubmission (e) {

  }

  handleKeyPress (e) {

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
      <form className="sign-up-form" onKeyPress={this.handleKeyPress} onSubmit={ this.handleSignUpSubmission }>
        <div className="sign-up-error-wrapper">
          { errors }
        </div>

        <div className="sign-up-form-wrapper">
          <label>Username
          <input
            className="sign-up-form-username"
            type="text"
            onChange={ this.changeUsername }/>
          </label>

          <label>Password
          <input
            className="sign-up-form-password"
            type="password"
            onChange={ this.changePassword }/>
          </label>

          <label>Avatar Upload
          <input
            className="sign-up-form-avatar"
            type="file"
            onChange={ this.changeFile }/>
          </label>

          <img className="sign-up-form-avatar-preview" src={ this.state.imageUrl } />

          <button className="submit" type="submit">Sign Up!</button>
          <button><Link to={ `/` }>Already have an account?</Link></button>
        </div>
      </form>
    );
  }
}

export default SignUpForm;
