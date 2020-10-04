import React from "react";
import "../Styles/modal.css";

const Modal = (props) => {
  const { children, handleModal } = props;

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <div className="modal-close" />
        <div className="close" onClick={handleModal}>
          X
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
