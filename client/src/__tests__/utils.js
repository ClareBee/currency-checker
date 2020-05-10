import { formatDate, formatResults } from "../utils/formatting";

it("formats the date", () => {
  expect(formatDate("2020-12-01")).toEqual("01/12/2020");
});

it("formats results", () => {
  const currencies = ["GBP", "JPN"];
  const baseCurrency = "GBP";
  const resultObject = { GBP: "12.0", JPN: "10" };
  expect(formatResults(resultObject, currencies, baseCurrency)).toEqual([
    ["JPN", "10"],
  ]);
});
