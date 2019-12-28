import React, { PureComponent } from "react";

//Components

//Styles

class ItemCard extends PureComponent {
  state = {
    showUrl: false,
    decription: "",
  };
  componentDidMount() {
    document.addEventListener("mouseenter", this.showUrl)
  }
  showUrl = (decription) => {
    const hoverOverLink = document.getElementsByClassName("link-topic");
    if (hoverOverLink) {
      this.setState({
        showUrl: true,
        decription,
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
    const { showUrl, decription} = this.state;
    const { filteredData  } = this.props;
    return (
      <div className="grid-container">
          {showUrl ? <div className="link-preview">
            {decription}
          </div> : null}
          {filteredData.map(link => {
            const id = link.fbId;
            return (
              <div className="grid-item" key={id}>
                <a href={link.field.link} onMouseEnter={() => this.showUrl(link.field.description)} onMouseLeave={this.hideUrl} target="_blank" rel="noopener noreferrer">
                    <div className="link-topic">{link.field.topic}</div>
                    <div className="description">{link.field.description}</div>

                </a>
                <div className="edit" onClick={() => this.handleShowEditForm(link.field.topic, link.field.link, link.field.description, id)}>
                  edit
                </div>
              </div>
            );
          })}
        </div>
    );
  }
}

export default ItemCard;