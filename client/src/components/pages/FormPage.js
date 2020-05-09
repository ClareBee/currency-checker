import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../layout/PageHeader";
import Main from "../layout/Main";
import Form from "../Form";

const BASE_CURRENCY = "EUR";
function FormPage({ currencies }) {
  const [result, setResult] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiGetExchangeRate("EUR");
  }, []);

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

  const formatResults = (resultObject) => {
    const results = Object.entries(resultObject);
    return results.filter(
      ([currency, ,]) =>
        currencies.includes(currency) && currency !== BASE_CURRENCY
    );
  };
  return (
    <Main>
      <Form rates={result} />
    </Main>
  );
}

export default FormPage;
