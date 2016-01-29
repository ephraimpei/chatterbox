import React from 'react';
import UsersIndex from '../user/users_index.jsx';
import ApiUserUtil from '../../apiutil/api_user_util.js';
import loggedInUsersStore from '../../stores/logged_in_users_store.js';

class UsersList extends React.Component {
  constructor (props, context) {
    super(props, context);
    this._onChange = this._onChange.bind(this);
    this.state = { loggedInUsers: loggedInUsersStore.get() };
  }

  componentDidMount () {
    loggedInUsersStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    loggedInUsersStore.removeChangeListener(this._onChange);
  }

  _onChange () {
    this.setState({ loggedInUsers: loggedInUsersStore.get() });
  }

  render () {
    return (
      <div className="users-list">
        <UsersIndex users={ this.state.loggedInUsers }/>
      </div>
    );
  }
}

export default UsersList;
