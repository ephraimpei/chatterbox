// reset sass
require("../static/stylesheets/sass/partials/_reset.scss");

// base sass
require("../static/stylesheets/sass/partials/_base.scss");

// footer sass
require("../static/stylesheets/sass/components/_footer.scss");

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

// stores
import CurrentUserStore from './stores/current_user_store.js';

$(document).ready(function () {
  const routes = (
    <Router history={ browserHistory }>
      <Route path="/" components={ ChatterboxApp } >
        <IndexRoute component={ LoginPage } />
        <Route path="/users/new" components={ SignUpPage } />
      </Route>
    </Router>
  );

  render(routes, document.getElementById('content'));
  render(<Footer/>, document.getElementById('footer-wrapper'));
});
