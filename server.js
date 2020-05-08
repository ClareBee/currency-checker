const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const cors = require("cors");

// TODO: move to env file
const API_URL = "http://data.fixer.io/api/";
const API_KEY = "14fdb7f80578d3cb6775222e27f9df1b";

const app = express();
const port = process.env.PORT || 3000;

// move to .env file
const corsOptions = {
  origin: "http://localhost:8080",
};
app.use(express.static(path.join(__dirname, "client/dist")));
app.listen(port, () => console.log(`Server Running on ${port}!`));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

// TODO: move to routes folder
app.get("/api/latest", cors(corsOptions), (req, res, next) => {
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

app.get("/api/history", cors(corsOptions), (req, res, next) => {
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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});
