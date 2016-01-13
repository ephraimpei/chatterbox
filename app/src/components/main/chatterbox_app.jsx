import React from 'react';
import LoginPage from '../auth/login_page.jsx';

require("../../../static/stylesheets/sass/components/_main_app.scss");

class ChatterboxApp extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
        <div className="main-app">
          <LoginPage/>
        </div>
     );
  }
}

export default ChatterboxApp;
