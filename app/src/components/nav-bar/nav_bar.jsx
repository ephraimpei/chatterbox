import React from 'react';
import UserSearch from './user_search.jsx';

class NavBar extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
        <div className="nav-bar">
          <UserSearch/>
        </div>
     );
  }
}

export default NavBar;
