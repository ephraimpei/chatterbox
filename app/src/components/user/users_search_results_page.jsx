import React from 'react';
import currentUserStore from '../../stores/current_user_store.js';
import NavBar from '../nav-bar/nav_bar.jsx';
import UsersIndex from './users_index.jsx';

class UsersSearchResultsPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.navigateToSearchResultsPage = this.navigateToSearchResultsPage.bind(this);
    this.__ensureLoggedIn = this.__ensureLoggedIn.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  
  componentWillMount () {
    this.__ensureLoggedIn();
  }

  navigateToSearchResultsPage (username) {
    this.context.router.push({
      pathname: '/users/search',
      query: { username: username }
    });
  }

  __ensureLoggedIn () {
    if (!currentUserStore.isLoggedIn()) {
      this.context.router.push('/');
    }
  }

  render () {
    return (
      <div className="users-search-results-page">
        <NavBar successfulUserSearch={ this.navigateToSearchResultsPage }/>

        <div className="users-search-results">
          <UsersIndex />
        </div>
      </div>
    );
  }
}

export default UsersSearchResultsPage;
