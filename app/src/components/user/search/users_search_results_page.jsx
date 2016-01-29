import React from 'react';
import currentUserStore from '../../../stores/current_user_store.js';
import NavBar from '../../nav-bar/nav_bar.jsx';
import UsersSearchIndex from './users_search_index.jsx';

class UsersSearchResultsPage extends React.Component {
  constructor (props, context) {
    super(props, context);
    this._ensureLoggedIn = this.__ensureLoggedIn.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    this._ensureLoggedIn();
  }

  componentDidMount () {
    currentUserStore.addChangeListener(this._ensureLoggedIn);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this._ensureLoggedIn);
  }

  __ensureLoggedIn () {
    if (!currentUserStore.isLoggedIn()) { this.context.router.push('/'); }
  }

  render () {
    return (
      <div className="users-search-results-page">
        <div className="users-search-results">
          <UsersSearchIndex />
        </div>
      </div>
    );
  }
}

export default UsersSearchResultsPage;
