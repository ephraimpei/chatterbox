import React from 'react';
import NavBar from '../nav-bar/nav_bar.jsx';
import FriendsList from '../friends/friends_list.jsx';
import currentUserStore from '../../stores/current_user_store.js';

class UserHomePage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.__ensureLoggedIn = this.__ensureLoggedIn.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    this.__ensureLoggedIn();
  }

  componentDidMount () {
    currentUserStore.addChangeListener(this.__ensureLoggedIn);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this.__ensureLoggedIn);
  }

  __ensureLoggedIn () {
    if (!currentUserStore.isLoggedIn()) {
      this.context.router.push('/');
    }
  }

  render () {
    return (
        <div className="user-home-page">
          <NavBar />
          <FriendsList />
        </div>
     );
  }
}

export default UserHomePage;
