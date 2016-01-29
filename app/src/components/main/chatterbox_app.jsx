import React from 'react';
import NavBar from '../nav-bar/nav_bar.jsx';
import currentUserStore from '../../stores/current_user_store.js';
import ApiSessionUtil from '../../apiutil/api_session_util.js';

class ChatterboxApp extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.getStateFromStore = this.getStateFromStore.bind(this);
    this.navigateToSearchResultsPage = this.navigateToSearchResultsPage.bind(this);
    this.navigateToUserHomePage = this.navigateToUserHomePage.bind(this);
    this._onChange = this._onChange.bind(this);
    this.state = { header: this.getStateFromStore() };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount () {
    ApiSessionUtil.fetchCurrentUser();
  }

  componentDidMount () {
    currentUserStore.addChangeListener(this._onChange);
  }

  componentWillUnmount () {
    currentUserStore.removeChangeListener(this._onChange);
  }

  getStateFromStore () {
    let result = currentUserStore.isLoggedIn() ? true : false;
    return result;
  }

  navigateToUserHomePage () {
    this.context.router.push('/users/' + currentUserStore.get().username);
  }

  navigateToSearchResultsPage (username) {
    this.context.router.push({
      pathname: '/users/search',
      query: { username: username }
    });
  }

  _onChange () {
    this.setState({ header: this.getStateFromStore() });
  }

  render () {
    const headerClass = this.state.header ? "header" : "header not-visible";

    return (
        <div className="main-app">
          <NavBar
            headerClass={ headerClass }
            successfulUserSearch={ this.navigateToSearchResultsPage }
            clickOnLogo={ this.navigateToUserHomePage }/>
          { this.props.children }
        </div>
     );
  }
}

export default ChatterboxApp;
