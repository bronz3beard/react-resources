import React from "react";
import "../Styles/nav.css";

const MaliciousData = (props) => {
  const { children } = props;

  return (
    <div className="malicious-warning">
      <p>
        {children}
      </p>
    </div>
  );
};

export default MaliciousData;
