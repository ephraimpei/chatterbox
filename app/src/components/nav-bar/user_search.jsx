import React from 'react';
import ApiUserUtil from '../../apiutil/api_user_util.js';
import userSearchAutoCompleteStore from '../../stores/user_autocomplete_store.js';

class UserSearch extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.handleUserSearchInput = this.handleUserSearchInput.bind(this);
    this.handleUserSearchAutoComplete = this.handleUserSearchAutoComplete.bind(this);
    this.__onChange = this.__onChange.bind(this);
    this.state = { username: "", showUserAutoCompleteList: false };
  }

  componentDidMount () {
    userSearchAutoCompleteStore.addChangeListener(this.__onChange);
  }

  componentWillUnmount () {
    userSearchAutoCompleteStore.removeChangeListener(this.__onChange);
  }

  handleUserSearchInput (e) {
    let username = e.currentTarget.value;

    this.setState({ username: username });

    this.handleUserSearchAutoComplete(username);
  }

  handleUserSearchAutoComplete (username) {
    if (username.length >= 4 && username.length <=25) {
      ApiUserUtil.fetchUsersForAutocomplete(username);
    } else {
      this.setState({ showUserAutoCompleteList: false });
    }
  }

  __onChange () {
    this.setState({ showUserAutoCompleteList: true });
  }

  render () {
    let users, userSearchAutoCompleteItems;

    if (this.state.showUserAutoCompleteList) {
      users = userSearchAutoCompleteStore.getUsers();

      userSearchAutoCompleteItems = users.map( function (user, idx) {
        return <li key={ idx }>{ user.username }</li>;
      });
    }

    return (
        <div className="user-search">
          <label>Find User</label>

          <input type="text"
            placeholder="Search for username"
            onChange={ this.handleUserSearchInput }/>

          <ul className="user-autocomplete-list">
            { userSearchAutoCompleteItems }
          </ul>
        </div>
     );
  }
}

export default UserSearch;
