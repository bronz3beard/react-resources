import React, { PureComponent } from "react";

//Components

//Styles
import "../Styles/form-filter.css";

class DataFilter extends PureComponent {
    handleShowForm = () => { // func in App.js
      this.props.handleShowForm();
    };
    changeHandler = event => { // func in App.js
      this.props.changeHandler(event);
    };
  render() {
    const { query, placeHolder } = this.props;
    return (
      <form className="filterForm">
        <input
          className="input-sm"
          id="grid-filter"
          type="text"
          name="query"
          placeholder={placeHolder}
          value={query}
          onChange={event => this.changeHandler(event)}
        />
        <span>
          <input
            type="button"
            onClick={this.handleShowForm}
            value="Add to the Cot"
          />
        </span>
      </form>
    );
  }
}

export default DataFilter;