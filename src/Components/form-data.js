import React, { PureComponent } from "react";

//Components
import Modal from "./modal";
import MaliciousData from "./data-is-malicious";
import DupilcateData from "./data-is-duplicate";
import SuccessSubmitData from "./data-added-success";
//Styles
import "../Styles/form-data.css";

class DataForm extends PureComponent {
  changeHandler = (event) => {
    // func in App.js
    this.props.changeHandler(event);
  };
  handleUrlCheck = (url, isEditForm, event) => {
    // func in App.js
    this.props.handleUrlCheck(url, isEditForm, event);
  };

  render() {
    const {
      link,
      topic,
      itemAdded,
      isEditForm,
      description,
      isMalicious,
      itemUpdated,
      isDuplicate,
      checkResponse,
      handleModal,
    } = this.props;

    if (isMalicious) {
      return (
        <Modal handleModal={handleModal}>
          <MaliciousData>{checkResponse}</MaliciousData>
        </Modal>
      );
    }
    if (isDuplicate) {
      return (
        <Modal handleModal={handleModal}>
          <DupilcateData />
        </Modal>
      );
    }
    if (itemAdded || itemUpdated) {
      return (
        <Modal handleModal={handleModal}>
          <SuccessSubmitData itemUpdated={itemUpdated} itemAdded={itemAdded} />
        </Modal>
      );
    }
    return (
      <Modal handleModal={handleModal}>
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
              onChange={(event) => this.changeHandler(event)}
            />
          </span>
          <span>
            <input
              required
              type="text"
              name="link"
              placeholder="Paste link"
              value={link}
              onChange={(event) => this.changeHandler(event)}
            />
          </span>
          <span>
            <input
              required
              type="text"
              className="description-input"
              name="description"
              placeholder="description"
              maxLength="80"
              value={description}
              onChange={(event) => this.changeHandler(event)}
            />
          </span>
          <span>
            <input type="submit" value="Post" />
          </span>
        </form>
      </Modal>
    );
  }
}

export default DataForm;
