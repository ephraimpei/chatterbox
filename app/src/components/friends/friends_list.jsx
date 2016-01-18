import React from 'react';
import FriendsIndex from "./friends_index.jsx";

class FriendsList extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
        <div className="friends-list">
          <FriendsIndex />
        </div>
     );
  }
}

export default FriendsList;
