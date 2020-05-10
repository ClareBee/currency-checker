import React from "react";
import { act } from "react-dom/test-utils";
import RateHistory from "../components/RateHistory";
import { render, screen } from "@testing-library/react";
import DataContext from "../components/DataContext";
function renderWithContext(ui, options) {
  return render(ui, { wrapper: Wrapper, ...options });
}

function Wrapper({ children }) {
  return (
    <DataContext.Provider
      value={{ baseCurrency: "GBP", currencies: ["USD", "JPN"] }}
    >
      {children}
    </DataContext.Provider>
  );
}
test("it renders with data", () => {
  act(() => {
    renderWithContext(
      <RateHistory
        reset={jest.fn()}
        multiplier={2}
        historyData={[{ date: "01/01/01", rates: { USD: "50", JPN: 40 } }]}
        selectedCurrencies={["USD", "JPN"]}
      />
    );
  });
  expect(screen.getByRole("heading")).toHaveTextContent("2 GBP");
  expect(screen.getAllByRole("row")[0]).toHaveTextContent("DateUSDJPN");
  expect(screen.getAllByRole("row")[1]).toHaveTextContent(
    "01/01/01100.0080.00"
  );
});
