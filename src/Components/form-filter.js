import React from "react";
import "../Styles/form-filter.css";

const DataFilter = (props) => {
  const { query, placeHolder, changeHandler, handleShowForm } = props;

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="filterForm" onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="query"
        value={query}
        id="grid-filter"
        className="input-sm"
        onChange={changeHandler}
        placeholder={placeHolder}
      />
      <span>
        <input
          type="button"
          value="Add to the COT"
          onClick={handleShowForm}
          style={{ fontSize: `${1}em` }}
        />
      </span>
    </form>
  );
};

export default DataFilter;
