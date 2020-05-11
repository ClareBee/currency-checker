import React from "react";
import { act } from "react-dom/test-utils";
import FormPage from "../components/pages/FormPage";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import DataContext from "../components/DataContext";
import axios from "axios";
function renderWithContext(ui, options) {
  return render(ui, { wrapper: Wrapper, ...options });
}

jest.mock("axios", () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: { rates: { GBP: "USD", JPN: "10" } },
      })
    ),
  };
});

function Wrapper({ children }) {
  return (
    <DataContext.Provider
      value={{ baseCurrency: "GBP", currencies: ["USD", "JPN"] }}
    >
      {children}
    </DataContext.Provider>
  );
}

test("it renders after api call", async () => {
  jest.useFakeTimers();
  await act(async () => {
    await renderWithContext(<FormPage />);
    jest.runAllTimers();
  });
  await axios.get("/");
  expect(axios.get).toHaveBeenCalledTimes(2); // renders twice in dev mode
  expect(screen.getByTestId("JPN")).toHaveAttribute("type", "checkbox");
});
