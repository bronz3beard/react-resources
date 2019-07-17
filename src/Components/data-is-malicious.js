import React, { PureComponent } from "react";

//Style
import "../Styles/nav.css";

class MaliciousData extends PureComponent {
  render() {
      const { children } = this.props;
    return (
        <div className="malicious-warning">
            <p>
                {children}
            </p>
        </div>
    );
  }
}

export default MaliciousData;