import React, { PureComponent } from "react";

//Components

//Styles

class ItemCard extends PureComponent {
  state = {
    showUrl: false,
    linkPreview: "",
  };
  componentDidMount() {
    document.addEventListener("mouseenter", this.showUrl)
  }
  showUrl = (link) => {
    const hoverOverLink = document.getElementsByClassName("link-topic");
    if (hoverOverLink) {
      this.setState({
        showUrl: true,
        linkPreview: link,
      });
    }
  }
  hideUrl = () => {
    const hoverOverLink = document.getElementsByClassName("link-topic");
    if (hoverOverLink) {
      this.setState({
        showUrl: false,
      });
    }
  }
  handleShowEditForm = (topic, link, description, linkId) => { // func in App.js
    this.props.handleShowEditForm(topic, link, description, linkId);
  };
  render() {
    const { showUrl, linkPreview} = this.state;
    const { filteredData  } = this.props;
    return (
      <div className="grid-container">
          {showUrl ? <div className="link-preview">
            {linkPreview}
          </div> : null}
          {filteredData.map(link => {
            const id = link.fbId;
            return (
              <span key={id} className="grid-item" onMouseEnter={() => this.showUrl(link.field.link)} onMouseLeave={this.hideUrl}>
                <a href={link.field.link} target="_blank" rel="noopener noreferrer">
                  <div className="link-topic">{link.field.topic}</div>
                  <div className="description">{link.field.description}</div>
                </a>
                <input
                  type="button"
                  value="edit"
                  className="edit"
                  onClick={() => this.handleShowEditForm(link.field.topic, link.field.link, link.field.description, id)}
                />
              </span>
            );
          })}
        </div>
    );
  }
}

export default ItemCard;