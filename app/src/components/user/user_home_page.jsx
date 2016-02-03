import React from 'react';
import $ from 'jquery';
import io from 'socket.io-client';
import NavBar from '../nav-bar/nav_bar.jsx';
import UsersList from '../sidebar/users_list.jsx';
import currentUserStore from '../../stores/current_user_store.js';
import loggedInUsersStore from '../../stores/logged_in_users_store.js';

class UserHomePage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.addWebSocketListeners = this.addWebSocketListeners.bind(this);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
    this.socket = io('http://' + document.domain + ':' + location.port + '/chat',
      { query:
        { username: currentUserStore.get().username }
      });
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    this._ensureLoggedIn();
  }

  componentDidMount () {
    this.addWebSocketListeners();
    currentUserStore.addChangeListener(this._ensureLoggedIn);
  }

  componentWillUnmount () {
    this.socket.emit('disconnect', { query: { username: currentUserStore.get().username } });
    this.socket.off();
    this.socket.close();
    currentUserStore.removeChangeListener(this._ensureLoggedIn);
  }

  addWebSocketListeners () {
    this.socket.on('a user connected', (data) => {
      console.log(data.broadcast);
      loggedInUsersStore.add(data.username)
    });

    this.socket.on('a user disconnected', (data) => {
      console.log(data.broadcast);
      loggedInUsersStore.remove(data.username)
    });

    this.socket.on('global chat response', (data) => {
      debugger;
    });
  }

  _ensureLoggedIn () {
    if (!currentUserStore.isLoggedIn()) { this.context.router.push('/'); }
  }

  render () {
    return (
      <div className="user-home-page">
        <UsersList />
      </div>
     );
  }
}

export default UserHomePage;
