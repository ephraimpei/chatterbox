import React from 'react';
import NavBar from '../nav-bar/nav_bar.jsx';
import FriendsList from '../friends/friends_list.jsx';

class UserProfile extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
        <div className="user-profile">
          <NavBar />
          <FriendsList />
        </div>
     );
  }
}

export default UserProfile;
