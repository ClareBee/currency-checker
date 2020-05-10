import React from "react";
import { act } from "react-dom/test-utils";
import Form from "../components/Form";
import { render, fireEvent, screen } from "@testing-library/react";
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
      <Form
        rates={[
          ["USD", 10],
          ["JPN", 200],
          ["EUR", 200],
        ]}
        handleSelectedCurrencies={jest.fn()}
      />
    );
  });
  expect(screen.getByTestId("base-currency")).toHaveTextContent("GBP");
  expect(screen.getByRole("textbox")).toHaveProperty("value", "1");
  expect(screen.getAllByRole("checkbox")[0]).toHaveProperty("id", "USD");
  expect(screen.getAllByRole("checkbox")[1]).toHaveProperty("id", "JPN");
});

test("it has checkboxes that can be toggled", () => {
  act(() => {
    renderWithContext(
      <Form
        rates={[
          ["USD", 10],
          ["JPN", 200],
          ["EUR", 200],
        ]}
        handleSelectedCurrencies={jest.fn()}
      />
    );
  });
  const USDcheckbox = screen.getByTestId("USD");
  expect(USDcheckbox.checked).toEqual(false);
  fireEvent.click(USDcheckbox);
  expect(USDcheckbox.checked).toEqual(true);
  fireEvent.click(USDcheckbox);
  expect(USDcheckbox.checked).toEqual(false);
});
