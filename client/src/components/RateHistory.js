import React from "react";

function History() {
  const resetForm = () => {
    console.log("resetting");
  };
  return (
    <div>
      History
      <button onClick={resetForm}>Reset Form</button>
    </div>
  );
}

export default History;
