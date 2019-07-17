import React, { PureComponent } from "react";

//Style
import "../Styles/nav.css";

class SuccessSubmitData extends PureComponent {
  render() {
    const { itemAdded, itemUpdated } = this.props;

    const updated = itemUpdated ? <div>this thing was updated successfully</div> : null;
    const added = itemAdded ? <div>you added a thing, nice!</div> : null;

    return (
      <div className="submit-success">
        {updated}
        {added}
      </div>
    );
  }
}

export default SuccessSubmitData;
