import React from "react";
import PropTypes from "prop-types";

function ErrorMsg({ msg }) {
  return (
    <div
      data-testid="error"
      className="error margin-bottom--md"
      aria-live="polite"
    >
      {msg}
    </div>
  );
}

ErrorMsg.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default ErrorMsg;
