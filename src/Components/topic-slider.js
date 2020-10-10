import React, { PureComponent } from "react";

//Styles
import "../Styles/topics.css";

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
    const { data, topicClickHandler } = this.props;

    // const shuffleData = this.shuffle(data);
    const topics = Array.from(
      new Set(
        data
          .filter((item) => item.field.topic)
          .map((duplicate) => duplicate.field.topic)
      )
    ).map((topic, key) => {
      return (
        <button
          key={key}
          id={topic}
          className="topic-label"
          onClick={topicClickHandler}
        >
          {topic}
        </button>
      );
    });
    return (
      <div className="topic-container">
        <div className="topic-label-shape">
          <button id="" className="topic-label" onClick={topicClickHandler}>
            All
          </button>
          {topics}
        </div>
      </div>
    );
  }
}

export default TopicSlider;
