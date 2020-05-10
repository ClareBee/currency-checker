require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const cors = require("cors");
const async = require("async");

const API_URL = process.env.FIXER_URL;
const API_KEY = process.env.FIXER_KEY;

const app = express();
const port = process.env.PORT || 3000;
// for dev env
const corsOptions = {
  origin: "http://localhost:8080",
};
app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

app.get("/api/latest", cors(corsOptions), (req, res, next) => {
  if (API_URL === undefined || API_KEY === undefined) {
    return res.status(422).send("Missing configuration");
  }
  const url = `${API_URL}latest?access_key=${API_KEY}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send("Server Error: Something went wrong");
    });
});

app.get("/api/history", cors(corsOptions), (req, res, next) => {
  const base = req.query.baseCurrency;
  const daysAgo = Number(req.query.daysAgo);
  const currencies = req.query.currencies;
  if (currencies.length < 1) {
    return res.status(422).send("No currencies submitted");
  }
  const urls = [];
  for (let i = 1; i <= daysAgo; i++) {
    let date = startDate(i);
    urls.push(
      `${API_URL}${date}?access_key=${API_KEY}&base=${base}&symbols=${currencies}`
    );
  }
  async.mapLimit(
    urls,
    1,
    async function (url) {
      const response = await fetch(url);
      return response.json();
    },
    (err, data) => {
      if (err) throw res.status(500).send("Something went wrong");
      res.send(data);
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});
app.listen(port, () => console.log(`Server Running on ${port}!`));

function startDate(daysAgo) {
  let startPoint = new Date();
  startPoint.setDate(startPoint.getDate() - daysAgo);
  const day = startPoint.getDate();
  const month = startPoint.getMonth() + 1;
  const year = startPoint.getFullYear();
  const monthDisplay = month < 10 ? `0${month}` : month;
  const dayDisplay = day < 10 ? `0${day}` : day;
  return `${year}-${monthDisplay}-${dayDisplay}`;
}
