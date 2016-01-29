// main sass file
require("../static/stylesheets/sass/main.scss");

// core modules
import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// components
import ChatterboxApp from './components/main/chatterbox_app.jsx';
import Footer from './components/main/footer.jsx';
import LoginPage from './components/auth/login_page.jsx';
import SignUpPage from './components/auth/sign_up_page.jsx';
import UserHomePage from './components/user/user_home_page.jsx';
import UsersSearchResultsPage from './components/user/search/users_search_results_page.jsx';

$(document).ready(function () {
  const routes = (
    <Route path="/" components={ ChatterboxApp } >
      <IndexRoute component={ LoginPage } />
      <Route path="/users/new" component={ SignUpPage } />
      <Route path="/users/search" component={ UsersSearchResultsPage } />
      <Route path="/users/:username" component={ UserHomePage } />
    </Route>
  );

  render(<Router history={ browserHistory } routes={routes} />,
    document.getElementById('content'));
  render(<Footer/>, document.getElementById('footer-wrapper'));
});
