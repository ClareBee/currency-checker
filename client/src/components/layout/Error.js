import React from "react";

function Error({ message }) {
  return (
    <div className="error margin-bottom--md" aria-live="polite">
      {message}
    </div>
  );
}

export default Error;
