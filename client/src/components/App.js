import React from "react";
import FormPage from "./pages/FormPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import DataContext from "./DataContext";

const CURRENCIES = [
  "USD",
  "EUR",
  "GBP",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "SEK",
  "NZD",
];

const BASE_CURRENCY = "EUR";

function App() {
  return (
    <DataContext.Provider
      value={{ currencies: CURRENCIES, baseCurrency: BASE_CURRENCY }}
    >
      <Header />
      {/* main content modifiable with navbar/router */}
      <FormPage />
      <Footer />
    </DataContext.Provider>
  );
}

export default App;
