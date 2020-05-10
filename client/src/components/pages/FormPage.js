import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Main from "../layout/Main";
import Loader from "../layout/Loader";
import Form from "../Form";
import RateHistory from "../RateHistory";
import { DataContext } from "../App";

function FormPage() {
  const [result, setResult] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");
  const [isFormView, setIsFormView] = useState(true);
  const [selectedCurrencies, setSelectedCurrencies] = useState(["USD", "NZD"]);
  const [historyData, setHistoryData] = useState([]);
  const [multiplier, setMultiplier] = useState(1);

  const { currencies, baseCurrency } = useContext(DataContext);

  useEffect(() => {
    apiGetExchangeRate("EUR");
  }, []);

  useEffect(() => {
    if (!isFormView) {
      apiGetHistoryRates(selectedCurrencies);
    }
  }, [selectedCurrencies]);

  const handleSelectedCurrencies = (currencies, amount) => {
    setIsFetching(true);
    setSelectedCurrencies(currencies);
    setMultiplier(amount);
    setIsFormView(false);
  };

  const reset = () => {
    setIsFormView(true);
    setSelectedCurrencies([]);
    setMultiplier(1);
    setHistoryData([]);
  };
  const apiGetExchangeRate = () => {
    axios
      .get("http://localhost:3000/api/latest")
      .then((response) => {
        const data = formatResults(response.data.data.rates);
        setResult(data);
      })
      .catch((error) => {
        setError("Something went wrong!");
        console.log(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const apiGetHistoryRates = () => {
    axios
      .get("http://localhost:3000/api/history", {
        params: {
          currencies: selectedCurrencies,
          daysAgo: 5,
          baseCurrency: baseCurrency,
        },
      })
      .then((response) => {
        const historyRates = response.data.data.map(({ date, rates }) => {
          return { date, rates };
        });
        if (historyRates.length === 0) {
          return setError("Something went wrong");
        }
        setHistoryData(historyRates);
      })
      .catch((error) => {
        setError("Something went wrong");
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
        currencies.includes(currency) && currency !== baseCurrency
    );
  };
  return (
    <Main>
      {error && <Error message={error} />}
      {isFormView ? (
        <Form
          rates={result}
          handleSelectedCurrencies={handleSelectedCurrencies}
        />
      ) : (
        <RateHistory
          historyData={historyData}
          selectedCurrencies={selectedCurrencies}
          multiplier={multiplier}
          reset={reset}
        />
      )}
      {isFetching && <Loader />}
    </Main>
  );
}

export default FormPage;
