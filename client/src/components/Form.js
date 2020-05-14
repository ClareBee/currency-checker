import React, { useState, useContext } from "react";
import { DebounceInput } from "react-debounce-input";
import PropTypes from "prop-types";
import DataContext from "./DataContext";
import Error from "./layout/Error";

const REQUIRED_NUM = 2;

function Form({ rates, handleSelectedCurrencies }) {
  const [amount, setAmount] = useState(1);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [error, setError] = useState("");
  const { baseCurrency } = useContext(DataContext);

  const handleChange = (e) => {
    const input = e.target.value;
    if (input.match(/\D+/g)) {
      setError("Not a number");
      return null;
    }
    setError("");
    setAmount(e.target.value);
    return null;
  };

  const handleCheckboxChange = (e) => {
    setError("");
    const currency = e.target.name;
    if (selectedCurrencies.includes(currency)) {
      setSelectedCurrencies(
        selectedCurrencies.filter((curr) => curr !== currency)
      );
    } else {
      setSelectedCurrencies(selectedCurrencies.concat(currency));
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCurrencies.length !== REQUIRED_NUM) {
      setError("Sorry! Wrong number of currencies selected.");
      setSelectedCurrencies([]);
      return null;
    }
    handleSelectedCurrencies(selectedCurrencies, amount);
    return null;
  };

  const todaysRates = () => {
    return rates.map(([currency, baseAmount]) => (
      <li
        key={currency}
        className={
          selectedCurrencies.includes(currency)
            ? "currency__row currency__row--selected"
            : "currency__row"
        }
        style={{
          backgroundColor: selectedCurrencies.includes(currency)
            ? "#d5d7d9"
            : "",
        }}
      >
        <label htmlFor={currency}>
          <input
            type="checkbox"
            name={currency}
            id={currency}
            data-testid={currency}
            checked={selectedCurrencies.includes(currency)}
            aria-checked={selectedCurrencies.includes(currency)}
            onChange={handleCheckboxChange}
            className="currency__checkbox"
          />
          <div className="currency__key">{currency}</div>
          <div className="currency__amount">
            {(baseAmount * amount).toFixed(2)}
          </div>
        </label>
      </li>
    ));
  };
  return (
    <form onSubmit={handleSubmit} className="component margin-top--sm">
      {error && <Error msg={error} />}
      <label htmlFor="currencyInput">
        <p className="currency__label" data-testid="base-currency">
          Enter a value for {baseCurrency}
        </p>
        <DebounceInput
          minLength={1}
          className="margin-bottom margin-top--sm currency__input"
          debounceTimeout={300}
          onChange={handleChange}
          value={amount}
          name="currencyInput"
          aria-required="true"
          autoFocus
        />
      </label>
      <p className="margin-top currency__label">
        Please select {REQUIRED_NUM}...
      </p>
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

Form.defaultProps = {
  rates: [],
};

Form.propTypes = {
  rates: PropTypes.array,
  handleSelectedCurrencies: PropTypes.func.isRequired,
};
export default Form;
