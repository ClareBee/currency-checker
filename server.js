require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const cors = require("cors");

// TODO: move to env file
const API_URL = process.env.FIXER_URL;
const API_KEY = process.env.FIXER_KEY;
const CLIENT = process.env.CLIENT_URL;

const app = express();
const port = process.env.PORT || 3000;
console.log(process.env);
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
  const date = dateToday();
  const base = "EUR";
  const currencies = "GBP,JPY,EUR";

  const url = `${API_URL}${date}?access_key=${API_KEY}&base=${base}&symbols=${currencies}`;

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

function dateToday() {
  const currentTimestamp = Date.now();
  const dateObject = new Date(currentTimestamp);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  return `${year}-${month}-${day}`;
}
