import React, { PureComponent } from "react";

//Styles
import "../Styles/topic-slider.css";

class TopicSlider extends PureComponent {
  //The modern version of the Fisher–Yates shuffle
  shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  render() {
    const { data } = this.props;

    // const shuffleData = this.shuffle(data);
    const topics = Array.from(
      new Set(data.map((duplicate) => duplicate.field.topic))
    ).map((topics, key) => {
      return (
        <span key={key} className="topic">
          {topics}
        </span>
      );
    });
    return <div className="scroll-left">{topics}</div>;
  }
}

export default TopicSlider;
