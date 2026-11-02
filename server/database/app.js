const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));

function loadJson(name) {
  const candidates = [
    path.join(__dirname, 'data', name),
    path.join(__dirname, name),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    }
  }
  throw new Error('Cannot find ' + name);
}

const reviews = loadJson('reviews.json')['reviews'];
const dealerships = loadJson('dealerships.json')['dealerships'];

app.get('/', (req, res) => {
  res.send('Welcome to the Express API');
});

app.get('/fetchReviews', (req, res) => {
  res.json(reviews);
});

app.get('/fetchReviews/dealer/:id', (req, res) => {
  const id = Number(req.params.id);
  res.json(reviews.filter((r) => Number(r.dealership) === id));
});

app.get('/fetchDealers', (req, res) => {
  res.json(dealerships);
});

app.get('/fetchDealers/:state', (req, res) => {
  res.json(dealerships.filter((d) => d.state === req.params.state));
});

app.get('/fetchDealer/:id', (req, res) => {
  const id = Number(req.params.id);
  res.json(dealerships.filter((d) => Number(d.id) === id));
});

app.post('/insert_review', express.raw({ type: '*/*' }), (req, res) => {
  try {
    const data = JSON.parse(req.body);
    const maxId = reviews.reduce((m, r) => Math.max(m, Number(r.id)), 0);
    const review = {
      id: maxId + 1,
      name: data['name'],
      dealership: data['dealership'],
      review: data['review'],
      purchase: data['purchase'],
      purchase_date: data['purchase_date'],
      car_make: data['car_make'],
      car_model: data['car_model'],
      car_year: data['car_year'],
    };
    reviews.push(review);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});