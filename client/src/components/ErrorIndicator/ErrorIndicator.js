import React from "react";
import PropTypes from "prop-types";

import "./ErrorIndicator.css";

const ErrorIndicator = ({ message }) => {
  const thisUrl = window.location.href;

  return (
    <div className="ErrorIndicator m-auto">
      <h2>Oops!</h2>
      <p dangerouslySetInnerHTML={{ __html: message }} />
      <button
        className="btn btn-danger"
        onClick={() => (window.location.href = thisUrl)}
      >
        Refresh page
      </button>
    </div>
  );
};

ErrorIndicator.defaultProps = {
  message: "Տեղի է ունեցել սխալ"
};

ErrorIndicator.propTypes = {
  message: PropTypes.string
};

export default ErrorIndicator;
