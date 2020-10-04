import React from "react";

const ScrollButton = (props) => {
  const { scrollToComponent } = props;

  return (
    <button
      title="Back to top"
      className="back-totop"
      onClick={scrollToComponent}
    >
      Back to top
    </button>
  );
};

export default ScrollButton;
