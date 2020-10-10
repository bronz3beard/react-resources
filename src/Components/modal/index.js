import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

const Modal = (props) => {
  const { children, handleModal, showModal } = props;

  return (
    <>
      {showModal && (
        <div className={styles.modalOverlay} id="MODAL">
          <div className={styles.modalBody}>
            <div className={styles.close} onClick={handleModal}>
              close
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  showModal: PropTypes.bool,
  handleModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Modal.defaultProps = {
  showModal: false,
  children: null,
};

export default Modal;
