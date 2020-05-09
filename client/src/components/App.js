import React from "react";
import FormPage from "./pages/FormPage";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

//TODO: discover endpoint on server?
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

function App() {
  return (
    <>
      <Header />
      {/* main content modifiable with navbar/router */}
      <FormPage currencies={CURRENCIES} />
      <Footer />
    </>
  );
}

export default App;
