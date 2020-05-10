import React from "react";
import FormPage from "./pages/FormPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

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

export const DataContext = React.createContext();

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
