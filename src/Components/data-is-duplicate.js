import React, { PureComponent } from "react";

//Style
import "../Styles/nav.css";

class DupilcateData extends PureComponent {
  render() {
    return (
      <div className="is-duplicate">
          The item was updated, but that link already exists in the database and was not added.
      </div>
    );
  }
}

export default DupilcateData;