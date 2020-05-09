import React from "react";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../utils/formatting";

function RateHistory({
  historyData,
  currencies,
  baseCurrency,
  multiplier,
  reset,
}) {
  const resetForm = () => {
    reset();
  };

  const formatRows = () => {
    if (historyData.length > 0) {
      return historyData.map(({ date, rates }) => {
        return (
          <tr key={date}>
            <th scope="row">{formatDate(date)}</th>
            {Object.values(rates).map((rate) => (
              <td key={uuidv4()}>{(rate * multiplier).toFixed(2)}</td>
            ))}
          </tr>
        );
      });
    }
  };
  const formatHeaders = () => {
    if (historyData.length > 0) {
      return Object.keys(historyData[0].rates).map((key) => (
        <th scope="col" key={key} className="results__top-header">
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
    <div className="results">
      <div className="results__header">
        <h3 className="results__title">
          {multiplier}
          {baseCurrency}
        </h3>
      </div>
      <p className="secondary-text">Amount entered in step 1</p>
      <table className="results__table">
        <caption className="screenreader-only">{captionText()}</caption>
        <tbody>
          <tr>
            <th className="results__top-header">Date</th>
            {formatHeaders()}
          </tr>
          {formatRows()}
        </tbody>
      </table>
      <button className="btn btn--primary" onClick={resetForm}>
        Reset Form
      </button>
    </div>
  );
}

export default RateHistory;
