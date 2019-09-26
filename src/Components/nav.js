import React, { PureComponent } from "react";

//Style
import "../Styles/nav.css";

class Nav extends PureComponent {
  render() {
    return (
      <div className="nav-menu">
            <span className="header">Collection of Things</span>
      </div>
    );
  }
}

export default Nav;