import React from "react";
import PropTypes from "prop-types";

function Main({ children }) {
  return <main className="margin-top--sm">{children}</main>;
}

Main.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
export default Main;
