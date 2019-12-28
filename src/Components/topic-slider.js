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
    }
  render() {
    const { data } = this.props;

    const shuffleData = this.shuffle(data)
    const topics = Array.from(new Set(shuffleData.map(duplicate => duplicate.field.topic))).map((topics, key) => {
        return (
          <div className="topic-container">
            <span key={key} className="topic-label-shape">
              <div className="topic-label">
                {topics}
              </div>
            </span>
          </div>
        );
    })
    return (
      <div className="topic-container">
        {topics}
      </div>
    );
  }
}

export default TopicSlider;
