import React from "react";
import { v4 as uuidv4 } from "uuid";

import { formatDate } from "../utils/formatting";

function RateHistory({ historyData, currencies, baseCurrency, multiplier }) {
  const resetForm = () => {
    console.log("resetting");
  };

  const formatRows = () => {
    if (historyData.length > 0) {
      return historyData.map(({ date, rates }) => {
        return (
          <tr key={date}>
            <th scope="row">{formatDate(date)}</th>
            {Object.values(rates).map((rate) => (
              <td key={uuidv4()}>{rate * multiplier}</td>
            ))}
          </tr>
        );
      });
    }
  };
  const formatHeaders = () => {
    console.log(historyData);
    if (historyData.length > 0) {
      return Object.keys(historyData[0].rates).map((key) => (
        <th scope="col" key={key}>
          {key}
        </th>
      ));
    }
  };

  const captionText = () => {
    return `Table comparing exchange rates for ${baseCurrency} with ${currencies.join(
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
