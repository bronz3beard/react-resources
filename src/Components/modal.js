import React, { useEffect } from "react";
import PropTypes, { element } from "prop-types";
import "../Styles/modal.css";

const Modal = (props) => {
  const {
    children,
    showModal,
    handleModal,
    backGroundStyle,
    backgroundColor,
    hideBodyOverflowY,
  } = props;

  useEffect(() => {
    document.body.style.overflowY =
      showModal && hideBodyOverflowY ? "hidden" : "auto";
  }, [hideBodyOverflowY, showModal]);

  return (
    <>
      {showModal && (
        <>
          <div className="modal-overlay">
            <div className="modal-body">
              <div className="modal-close" />
              <div className="close" onClick={handleModal}>
                X
              </div>
              {children}
            </div>
          </div>
        </>
      )}
    </>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(element),
    PropTypes.node,
  ]),
  handleModal: PropTypes.func,
  showModal: PropTypes.bool,
  backGroundStyle: PropTypes.objectOf({
    background: PropTypes.string,
    backgroundSize: PropTypes.string,
    backgroundPosition: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundAttachment: PropTypes.string,
  }),
  hideBodyOverflowY: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

Modal.defaultProps = {
  children: null,
  handleModal: null,
  showModal: false,
  backGroundStyle: null,
  hideBodyOverflowY: true,
  backgroundColor: "black",
};

export default Modal;
