import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import axiosMock from "axios";
import * as axios from "axios";

import App from "../components/App";

jest.mock("axios");

// test("loads and displays currencies", async () => {
//   const url = "/api/latest";
//   axios.get.mockImplementation(() => Promise.resolve({ data: { rates: [] } }));
//   render(<App />);

//   // axiosMock.get.mockResolvedValueOnce({
//   //   data: { rates: [] },
//   // });

//   // // fireEvent.click(screen.getByText('Load Greeting'))
//   setTimeout(() => {}, 0);
//   expect(axios).toHaveBeenCalledTimes(1);
//   // expect(axiosMock.get).toHaveBeenCalledWith(url);
//   // expect(screen.getByRole("button")).toHaveTextContent("Compare");
//   // expect(screen.getByRole('button')).toHaveAttribute('disabled')
// });

test("it works", () => {});
