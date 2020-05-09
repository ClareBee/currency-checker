import React, { useState } from "react";

function Form({ rates }) {
  const [amount, setAmount] = useState(1);
  const todaysRates = () => {
    // return rates.map((rate) => <li>{rate}</li>);
    console.log(Array.isArray(rates));
    return rates.map(([currency, baseAmount]) => (
      <li>
        {currency} {(baseAmount * amount).toFixed(2)}
      </li>
    ));
  };

  const handleChange = (e) => {
    console.log(e);
    setAmount(e.target.value);
  };
  return (
    <form>
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
