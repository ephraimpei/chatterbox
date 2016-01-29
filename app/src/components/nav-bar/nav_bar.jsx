import React from 'react';
import UserSearch from './user_search.jsx';
import Notifications from './notifications.jsx';
import Options from './options.jsx';
import { displayFlashMessage } from '../../utilities/flash.js';

class NavBar extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.logoutSuccess = this.logoutSuccess.bind(this);
  }

  logoutSuccess (message) {
    displayFlashMessage(message);
  }

  render () {
    return (
      <div className={ this.props.headerClass }>
        <div className="nav-bar">
          <img className="logo" onClick={ this.props.clickOnLogo }
            src="/images/chatterbox_logo_angelic_version_by_spartasaurus.png"/>
          <UserSearch successfulUserSearch={ this.props.successfulUserSearch }/>
          <Notifications/>
          <Options logoutSuccess={ this.logoutSuccess }/>
        </div>
      </div>
     );
  }
}

export default NavBar;
