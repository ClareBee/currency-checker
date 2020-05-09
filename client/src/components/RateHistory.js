import React from "react";

function RateHistory({ historyData }) {
  const resetForm = () => {
    console.log("resetting");
  };
  return (
    <div>
      History
      {JSON.stringify(historyData)}
      <button onClick={resetForm}>Reset Form</button>
    </div>
  );
}

export default RateHistory;
