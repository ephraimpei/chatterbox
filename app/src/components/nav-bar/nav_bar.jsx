import React from 'react';
import UserSearch from './user_search.jsx';
import ProfileOptions from './profile_options.jsx';
import Notifications from './notifications.jsx';

class NavBar extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
      <div className="header">
        <div className="nav-bar">
          <img src="/images/chatterbox_logo_angelic_version_by_spartasaurus.png"/>
          <UserSearch/>
          <Notifications/>
          <ProfileOptions/>
        </div>
      </div>
     );
  }
}

export default NavBar;
