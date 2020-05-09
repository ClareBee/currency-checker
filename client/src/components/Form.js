import React, { useState } from "react";
import Error from "./Error";

const REQUIRED_NUM = 2;
function Form({ rates, handleSelectedCurrencies, baseCurrency }) {
  const [amount, setAmount] = useState(1);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [error, setError] = useState("");
  const todaysRates = () => {
    return rates.map(([currency, baseAmount]) => (
      <li
        key={currency}
        className="currency__row"
        style={{
          backgroundColor: selectedCurrencies.includes(currency)
            ? "#d5d7d9"
            : "",
        }}
      >
        <label>
          <p className="screenreader-only">{currency}</p>
          <input
            type="checkbox"
            name={currency}
            checked={selectedCurrencies.includes(currency)}
            onChange={handleCheckboxChange}
            className="screenreader-only"
          />
          <div>{currency}</div>
          <div>{(baseAmount * amount).toFixed(2)}</div>
        </label>
      </li>
    ));
  };

  const handleChange = (e) => {
    setError("");
    setAmount(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setError("");
    setSelectedCurrencies(selectedCurrencies.concat(e.target.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: replace naive error handling
    if (selectedCurrencies.length !== REQUIRED_NUM) {
      setError(`Sorry! Wrong number of currencies selected.`);
      setSelectedCurrencies([]);
      return null;
    }
    handleSelectedCurrencies(selectedCurrencies, amount);
  };
  return (
    <form onSubmit={handleSubmit} className="component margin-top">
      {error && <Error message={error} />}
      <label>
        <p className="currency__label">Enter a value for {baseCurrency}</p>
        <input
          className="margin-bottom margin-top--sm currency__input"
          type="number"
          name="amount"
          value={amount}
          onChange={handleChange}
        />
      </label>
      <label className="margin-top currency__label">
        Please select {REQUIRED_NUM}...
      </label>
      <ul className="margin-top--sm currency__list">{todaysRates()}</ul>
      <button
        disabled={!!error}
        className="btn btn--primary margin-top"
        type="submit"
      >
        Compare
      </button>
    </form>
  );
}
export default Form;
