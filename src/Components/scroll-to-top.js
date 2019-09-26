import React, { PureComponent } from "react";

class ScrollButton extends PureComponent {
  scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <button title="Back to top" className="back-totop" onClick={this.scrollToTop}>Back to top</button>
    );
  }
}

export default ScrollButton;