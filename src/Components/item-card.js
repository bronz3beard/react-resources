import React, { useState, useRef } from "react";
import { scrollToComponent } from "../utils/functions";
import ScrollButton from "./scroll-to-top";

const ItemCard = (props) => {
  const { filteredData, handleShowEditForm } = props;
  const [showUrl, setShowUrl] = useState(false);
  const [scrollTopClicked, setScrollTopClicked] = useState(false);
  const [linkPreview, setLinkPreview] = useState("");
  const scrollToRef = useRef(null);

  const handleShowUrl = (event) => {
    const link = event.target.parentElement.href;

    setShowUrl(true);
    setLinkPreview(link);
  };

  const handleHideUrl = () => {
    setShowUrl(false);
  };

  const handleScrollTo = () => {
    setScrollTopClicked(true);

    if (scrollTopClicked) {
      scrollToComponent(scrollToRef);
    }
  };

  return (
    <div className="grid-container">
      <span ref={scrollToRef}></span>
      {showUrl && <div className="link-preview">{linkPreview}</div>}
      {filteredData.map((link) => (
        <div key={link.fbId} className="grid-item">
          <a
            target="_blank"
            href={link.field.link}
            rel="noopener noreferrer"
            onMouseEnter={handleShowUrl}
            onMouseLeave={handleHideUrl}
          >
            <div className="link-topic">{link.field.topic}</div>
            <div className="description">{link.field.description}</div>
          </a>
          <div
            className="edit"
            onClick={handleShowEditForm}
            id={`${link.field.topic}#${link.field.link}#${link.field.description}#${link.fbId}`}
          >
            edit
          </div>
        </div>
      ))}
      <ScrollButton scrollToComponent={handleScrollTo} />
      <footer>
        Collection of Things© 2020 <span>Exempli.Gratia.</span> web design
      </footer>
    </div>
  );
};

export default ItemCard;
