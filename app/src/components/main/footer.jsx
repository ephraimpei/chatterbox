import React from 'react';

require("../../../static/stylesheets/sass/components/_footer.scss");

class Footer extends React.Component {
  constructor () {
    super();
  }

  render () {
    return (
      <div className="footer group">
        <label className="about">Copyright © 2015 Ephraim Pei</label>

        <ul className="links group">
          <a className="my-website-icon" href="http://www.ephraimpei.com">
            <img
              className="social-media-icon"
              src="/images/icons/ephraim.png"/>
          </a>
          <a href="https://www.linkedin.com/in/ephraimpei">
            <img
              className="social-media-icon"
              src="/images/icons/linkedin.png"/>
          </a>
          <a href="https://github.com/ephraimpei">
            <img
              className="social-media-icon"
              src="/images/icons/github.png"/>
          </a>
        </ul>
      </div>
     );
  }
}

export default Footer;
