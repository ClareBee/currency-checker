import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Main from "../layout/Main";
import Loader from "../layout/Loader";
import Form from "../Form";
import RateHistory from "../RateHistory";
import ErrorMsg from "../layout/Error";
import DataContext from "../DataContext";
import { formatResults } from "../../utils/formatting";

function FormPage() {
  const [result, setResult] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isFormView, setIsFormView] = useState(true);
  const [selectedCurrencies, setSelectedCurrencies] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [multiplier, setMultiplier] = useState(1);

  const { currencies, baseCurrency } = useContext(DataContext);

  const LATEST_URL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/latest"
      : "/api/latest";
  const HISTORY_URL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/history"
      : "/api/history";

  const apiGetExchangeRate = () => {
    axios
      .get(LATEST_URL)
      .then((response) => {
        const {
          data: { rates },
        } = response;
        const data = formatResults(rates, currencies, baseCurrency);
        setResult(data);
      })
      .catch((error) => {
        setErrorMsg(error.response.data);
      })
      .finally(() => {
        setIsFetching(false);
      });
    return null;
  };

  const apiGetHistoryRates = () => {
    axios
      .get(HISTORY_URL, {
        params: {
          currencies: selectedCurrencies,
          daysAgo: 5,
          baseCurrency,
        },
      })
      .then((response) => {
        const historyRates = response.data.map(({ date, rates }) => {
          return { date, rates };
        });
        if (historyRates.length === 0) {
          return setErrorMsg("Something went wrong");
        }
        setHistoryData(historyRates);
        return null;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
    return null;
  };

  useEffect(() => {
    apiGetExchangeRate(baseCurrency);
  }, []);

  useEffect(() => {
    if (!isFormView) {
      apiGetHistoryRates(selectedCurrencies);
    }
  }, [selectedCurrencies]);

  const handleSelectedCurrencies = (curr, mult) => {
    setIsFetching(true);
    setSelectedCurrencies(curr);
    setMultiplier(mult);
    setIsFormView(false);
  };

  const reset = () => {
    setIsFormView(true);
    setSelectedCurrencies([]);
    setMultiplier(1);
    setHistoryData([]);
  };

  return (
    <Main>
      {errorMsg && <ErrorMsg msg={errorMsg} />}
      {isFormView ? (
        <Form
          errorMsg={errorMsg}
          rates={result}
          handleSelectedCurrencies={handleSelectedCurrencies}
        />
      ) : (
        <RateHistory
          historyData={historyData}
          selectedCurrencies={selectedCurrencies}
          multiplier={Number(multiplier)}
          reset={reset}
        />
      )}
      {isFetching && <Loader />}
    </Main>
  );
}

export default FormPage;
