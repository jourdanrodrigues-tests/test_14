const express = require('express'); // eslint-disable-line @typescript-eslint/no-var-requires
const cors = require('cors'); // eslint-disable-line @typescript-eslint/no-var-requires
const app = express();
const port = +(process.env.PORT || 3001);

app.use(cors({ origin: '*' }));

const data = [
  ['Fruit', 'Quantity', 'Price'],
  ['Apples', '1', '$1'],
  ['Avocados', '2', '$5'],
  ['Blueberries', '100', '$10'],
  ['Kishus', '20', '$10'],
  ['Strawberries', '40', '$5'],
];

app.get('/list', (req, res) => {
  const delay = Math.random() * 2000;

  setTimeout(() => {
    Math.random() <= 0.1 ? res.sendStatus(500) : res.send(data);
  }, delay);
});

app.get('/highlights', (req, res) => {
  const delay = Math.random() * 3000;

  setTimeout(() => {
    Math.random() <= 0.05
      ? res.sendStatus(500)
      : res.send([
          Math.floor(Math.random() * (data.length - 1)),
          Math.floor(Math.random() * (data.length - 1)),
        ]);
  }, delay);
});

app.listen(port, () => {
  console.log(`Exercise 1 app listening on port ${port}`);
});
