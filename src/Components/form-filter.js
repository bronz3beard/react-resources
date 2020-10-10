import React from "react";
import "../Styles/form-filter.css";

const DataFilter = (props) => {
  const {
    query,
    signIn,
    showMyData,
    showFilters,
    placeHolder,
    changeHandler,
    handleShowForm,
    handleShowMyData,
    handleShowFilters,
  } = props;

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
      <div className="filter-options">
        <input
          type="button"
          value="Add to the COT"
          onClick={handleShowForm}
          className="filter-buttons"
          style={{ fontSize: `${1}em` }}
        />
        <input
          type="button"
          value={!showFilters ? "Show Topic Filters" : "Hide Topics"}
          onClick={handleShowFilters}
          className="filter-buttons topics"
          style={{ fontSize: `${1}em` }}
        />
        {signIn && (
          <input
            type="button"
            value={!showMyData ? "Show My Links" : "Show All links"}
            onClick={handleShowMyData}
            className="filter-buttons"
            style={{ fontSize: `${1}em` }}
          />
        )}
      </div>
    </form>
  );
};

export default DataFilter;
