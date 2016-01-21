import React from 'react';
import ApiSessionUtil from '../../apiutil/api_session_util.js';

class Options extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
  }

  logoutCurrentUser (e) {
    e.preventDefault();

    ApiSessionUtil.logout(this.props.logoutSuccess);
  }
  render () {
    let options = ["Update profile", "Logout"];

    let optionListItems = options.map( (option, idx) =>
      <li key={ idx }>{ option }</li>
    );

    return (
      <div className="options">Options
        <ul className="options-list">
          <li key="1">Update Profile</li>
          <li key="2" onClick={ this.logoutCurrentUser }>Logout</li>
        </ul>
      </div>
     );
  }
}

export default Options;
