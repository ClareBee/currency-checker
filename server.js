require("dotenv").config();

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const cors = require("cors");
const async = require("async");
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
  // TODO pass in on request?
  const daysAgo = 5;
  const base = "EUR";
  const currencies = req.query.currencies;
  console.log("currencies", currencies);
  if (currencies.length < 1) {
    console.log("error");
    return res.send({ error: "No currencies submitted" });
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
    (err, results) => {
      if (err) throw res.send(err);
      res.send({ data: results });
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

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
