import React, { useEffect, useState } from "react";
import axios from "axios";
import Main from "../layout/Main";
import Form from "../Form";
import RateHistory from "../RateHistory";

const BASE_CURRENCY = "EUR";
function FormPage({ currencies }) {
  const [result, setResult] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [isFormView, setIsFormView] = useState(false);
  const [selectedCurrencies, setSelectedCurrencies] = useState(["USD", "NZD"]);
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    apiGetExchangeRate("EUR");
  }, []);

  useEffect(() => {
    if (!isFormView) {
      apiGetHistoryRates(selectedCurrencies);
    }
  }, [selectedCurrencies]);

  const apiGetExchangeRate = (base) => {
    axios
      .get("http://localhost:3000/api/latest")
      .then((response) => {
        const data = formatResults(response.data.data.rates);
        setResult(data);
        console.log(response);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const apiGetHistoryRates = (targetCurrencies) => {
    axios
      .get("http://localhost:3000/api/history", {
        params: {
          currencies: selectedCurrencies,
          daysAgo: 5,
          baseCurrency: BASE_CURRENCY,
        },
      })
      .then((response) => {
        const data = {};
        const historyRates = response.data.data.map(({ date, rates }) => {
          return { date, rates };
        });
        setHistoryData(historyRates);
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const formatResults = (resultObject) => {
    const results = Object.entries(resultObject);
    return results.filter(
      ([currency, ,]) =>
        currencies.includes(currency) && currency !== BASE_CURRENCY
    );
  };
  return (
    <Main>
      {isFormView ? (
        <Form rates={result} />
      ) : (
        <RateHistory
          historyData={historyData}
          currencies={selectedCurrencies}
          baseCurrency={BASE_CURRENCY}
        />
      )}
    </Main>
  );
}

export default FormPage;
