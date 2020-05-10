import React from "react";

function ErrorMsg({ msg }) {
  return (
    <div className="error margin-bottom--md" aria-live="polite">
      {msg}
    </div>
  );
}

export default ErrorMsg;
