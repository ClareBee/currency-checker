import React from "react";
import { act } from "react-dom/test-utils";

import App from "../components/App";
import { render, fireEvent, screen } from "@testing-library/react";

test("it needs selected currencies before you can submit the form ", () => {
  act(() => {
    render(<App />);
  });
  act(() => {
    fireEvent.click(screen.getByText("Compare"));
  });
  expect(screen.getByTestId("error")).toHaveTextContent(
    "Sorry! Wrong number of currencies selected."
  );
});
