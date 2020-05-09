import React, { useState } from "react";

function Form({ rates, handleSelectedCurrencies }) {
  const [amount, setAmount] = useState(1);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const todaysRates = () => {
    return rates.map(([currency, baseAmount]) => (
      <li key={currency}>
        <label>
          <input
            type="checkbox"
            name={currency}
            onChange={handleCheckboxChange}
          />
          {currency} {(baseAmount * amount).toFixed(2)}
        </label>
      </li>
    ));
  };

  const handleChange = (e) => {
    console.log(e);
    setAmount(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setSelectedCurrencies(selectedCurrencies.concat(e.target.name));
    console.log(e.target.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCurrencies.length < 2) return null;
    handleSelectedCurrencies(selectedCurrencies, amount);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {/* TODO: replace EUR with base currency */}
        Enter a value for EUR
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={handleChange}
        />
      </label>
      <ul>{todaysRates()}</ul>
      <input className="" type="submit" value="Compare" />
    </form>
  );
}
export default Form;
