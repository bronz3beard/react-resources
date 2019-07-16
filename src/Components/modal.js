import React, { PureComponent } from "react";

//Components

//Styles

class Modal extends PureComponent {
  handleModal = () => {
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