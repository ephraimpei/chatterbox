import React from 'react';

class UsersIndex extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    console.log(this.props.users);
    const users = this.props.users.map((user, idx) => <li key={ idx }>{ user.username }</li>);

    return (
      <ul className="users-index">
        { users }
      </ul>
    );
  }
}

export default UsersIndex;
