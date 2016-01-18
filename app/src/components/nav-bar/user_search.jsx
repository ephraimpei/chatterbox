import React from 'react';

class UserSearch extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.state = { username: "" };
  }

  render () {
    return (
        <div className="user-search">
          <label>Find User</label>
          <input type="text"
            value={ this.state.username }
            placeholder="Search for username"
            onChange={ this.autoCompleteUsername}/>
        </div>
     );
  }
}

export default UserSearch;
