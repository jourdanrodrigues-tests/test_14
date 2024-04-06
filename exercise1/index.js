const express = require('express');
const app = express();
const port = 3000;

const data = [
  ["Fruit", "Quantity", "Price"],
  ["Apples", "1", "$1"],
  ["Avocados", "2", "$5"],
  ["Blueberries", "100", "$10"],
  ["Kishus", "20", "$10"],
  ["Strawberries", "40", "$5"],
];

app.get('/list', (req, res) => {
  const delay = Math.random() * 2000;

  setTimeout(() => {
    Math.random() <= .1 ? 
      res.sendStatus(500) :
      res.send(data);
  }, delay);
});

app.get('/highlights', (req, res) => {
  const delay = Math.random() * 3000;

  setTimeout(() => {
    Math.random() <= .05 ? 
      res.sendStatus(500) :
      res.send([
        Math.floor(Math.random() * (data.length - 1)),
        Math.floor(Math.random() * (data.length - 1)),
      ]);
  }, delay);
});

app.listen(port, () => {
  console.log(`Sensible code challenge app listening on port ${port}`)
});
