import React, { PureComponent } from "react";

//Styles
import "../Styles/topic-slider.css";

class TopicSlider extends PureComponent {
  render() {
    const { data } = this.props;

    const topics = Array.from(new Set(data.map(duplicate => duplicate.field.topic))).map((topics, key) => {
        return (
          <span key={key} className="topic">{topics}</span>
        );
    })
    return (
      <p className="scroll-left">{topics}</p>
    );
  }
}

export default TopicSlider;
