import React, { PureComponent } from "react";
import firebase from "../Firebase/firebase";

//Components
import Modal from "./modal";
//Styles
import "../Styles/form-data.css";
import "../Styles/modal.css";

class DataForm extends PureComponent {
  changeHandler = event => {
    this.props.changeHandler(event);
  };
  handleUrlCheck = (url, isEditForm, event) => {
    this.props.handleUrlCheck(url, isEditForm, event);
  };

  render() {
    const {
      topic,
      link,
      description,
      isMalicious,
      checkResponse,
      isEditForm,
      handleModal
    } = this.props;

    return (
      <Modal handleModal={handleModal}>
        {!isMalicious ? 
          <form
          className="add-data-form"
          onSubmit={(event) => this.handleUrlCheck(link, isEditForm, event)}
        >
          <span>
            <input
              required
              type="text"
              name="topic"
              placeholder="Topic"
              value={topic}
              onChange={event => this.changeHandler(event)}
            />
          </span>
          <span>
            <input
              required
              type="text"
              name="link"
              placeholder="Paste link"
              value={link}
              onChange={event => this.changeHandler(event)}
            />
          </span>
          <span>
            <input
              required
              type="text"
              className="description-input"
              name="description"
              placeholder="description"
              maxLength="30"
              value={description}
              onChange={event => this.changeHandler(event)}
            />
          </span>
          <span>
            <input type="submit" value="Post" />
          </span>
        </form> : <div className="malicious-warning"><p>{checkResponse}</p></div>}
      </Modal>
    );
  }
}

export default DataForm;

const regexTest = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;