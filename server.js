const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const API_URL = "http://data.fixer.io/api/";
const API_KEY = "14fdb7f80578d3cb6775222e27f9df1b";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

app.listen(port, () => console.log(`Server Running on ${port}!`));

app.use(express.static("public"));

app.get("/api/latest", (req, res, next) => {
  const url = `${API_URL}latest?access_key=${API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      res.send({ data });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/api/history", (req, res, next) => {
  const date = "2020-03-10";
  const base = "EUR";
  const currencies = "GBP,JPY,EUR";

  const url = `${API_URL}${date}?access_key=${API_KEY}&base=EUR&symbols=${currencies}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.send(err);
    });
});
