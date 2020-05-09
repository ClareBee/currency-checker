import React from "react";
import { formatDate } from "../utils/formatting";

function RateHistory({ historyData, currencies, baseCurrency }) {
  const resetForm = () => {
    console.log("resetting");
  };

  const formatRows = () => {
    if (historyData.length > 0) {
      return historyData.map(({ date, rates }) => {
        return (
          <tr>
            <th scope="row">{formatDate(date)}</th>
            {Object.values(rates).map((rate) => (
              <td>{rate}</td>
            ))}
          </tr>
        );
      });
    }
  };
  const formatHeaders = () => {
    if (historyData.length > 0) {
      return Object.keys(historyData[0].rates).map((key) => (
        <th scope="col">{key}</th>
      ));
    }
  };

  const captionText = () => {
    return `Table comparing exchange rates for ${baseCurrency} ${currencies.join(
      ","
    )}`;
  };
  return (
    <div>
      History
      <table>
        <caption className="hidden">{captionText()}</caption>
        <tbody>
          <tr>
            <th>Date</th>
            {formatHeaders()}
          </tr>
          {formatRows()}
        </tbody>
      </table>
      <button onClick={resetForm}>Reset Form</button>
    </div>
  );
}

export default RateHistory;
