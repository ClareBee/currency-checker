import React, { useContext } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { formatDate } from "../utils/formatting";
import DataContext from "./DataContext";

function RateHistory({ historyData, selectedCurrencies, multiplier, reset }) {
  const { baseCurrency } = useContext(DataContext);

  const resetForm = () => {
    reset();
    return null;
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
    return null;
  };

  const formatHeaders = () => {
    if (historyData.length > 0) {
      return Object.keys(historyData[0].rates).map((key) => (
        <th scope="col" key={key} className="results__top-header">
          {key}
        </th>
      ));
    }
    return null;
  };

  const captionText = () => {
    return `Table comparing exchange rates for ${baseCurrency} with ${selectedCurrencies.join(
      ","
    )}`;
  };

  return (
    <div className="results">
      <div className="results__header">
        <h3 className="results__title">
          {multiplier} {baseCurrency}
        </h3>
        <p className="secondary-text">(amount entered in step 1)</p>
      </div>
      <table className="results__table margin-top--lg margin-bottom--lg">
        <caption className="screenreader-only">{captionText()}</caption>
        <tbody>
          <tr>
            <th className="results__top-header">Date</th>
            {formatHeaders()}
          </tr>
          {formatRows()}
        </tbody>
      </table>
      {historyData.length > 1 && (
        <button className="btn btn--primary" onClick={resetForm} type="button">
          Reset Form
        </button>
      )}
    </div>
  );
}

RateHistory.defaultProps = {
  historyData: [],
  selectedCurrencies: [],
};

RateHistory.propTypes = {
  reset: PropTypes.func.isRequired,
  multiplier: PropTypes.number.isRequired,
  historyData: PropTypes.array,
  selectedCurrencies: PropTypes.array,
};

export default RateHistory;
