import React from 'react';
import LoginPage from '../auth/login_page.jsx';
import ApiSessionUtil from '../../apiutil/api_session_util.js';

class ChatterboxApp extends React.Component {
  constructor (props, context) {
    super(props, context);
  }

  componentWillMount () {
    ApiSessionUtil.fetchCurrentUser();
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
