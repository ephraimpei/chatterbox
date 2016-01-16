import React from 'react';
import LoginPage from '../auth/login_page.jsx';

require("../../../static/stylesheets/sass/components/_main_app.scss");

class ChatterboxApp extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  render () {
    return (
        <div className="main-app">
          { this.props.children }
        </div>
     );
  }
}

export default ChatterboxApp;
