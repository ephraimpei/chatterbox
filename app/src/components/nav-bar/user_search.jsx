import React from 'react';
import ApiUserUtil from '../../apiutil/api_user_util.js';

class UserSearch extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.autoCompleteUsername = this.autoCompleteUsername.bind(this);
    this.state = { username: "" };
  }

  autoCompleteUsername (e) {
    let username = e.currentTarget.value;

    this.setState({ username: username });
  }

  render () {
    return (
        <div className="user-search">
          <label>Find User</label>
          <input type="text"
            placeholder="Search for username"
            onChange={ this.autoCompleteUsername }/>
        </div>
     );
  }
}

export default UserSearch;
