import React, { PureComponent } from "react";

//Components

//Styles
import "../Styles/modal.css";

class Modal extends PureComponent {
  handleModal = () => { // func in App.js
        this.props.handleModal();
    };
  render() {
    const { children } = this.props;
    return (
        <div className="modal-overlay">
        <div className="modal-body">
          <div className="modal-close" />
          <div className="close" onClick={this.handleModal}>X</div>
          {children}
        </div>
      </div>
    );
  }
}

export default Modal;