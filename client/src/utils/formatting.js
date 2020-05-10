/* eslint-disable import/prefer-default-export */

export const formatDate = (date) => {
  const elements = date.split("-");
  return elements.reverse().join("/");
};

export const formatResults = (resultObject, currencies, baseCurrency) => {
  const results = Object.entries(resultObject);
  return results.filter(
    ([currency, ,]) =>
      currencies.includes(currency) && currency !== baseCurrency
  );
};
