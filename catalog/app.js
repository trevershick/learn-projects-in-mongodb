const express = require('express');
const bodyParser = require('body-parser');
const mongoJs = require('mongojs');
const db = mongoJs('catalog', ['products']);

const app = express();

const port = 3000;

// setup body parser middleware
app.use(bodyParser.json());

// routes
app.get('/', (req, res, next) => {
  res.send('Please use /api/products');
});

app.get('/api/products', (req, res, next) => {
  db.products.find((err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.json(docs);
    }
  });
});
app.post('/api/products', (req, res, next) => {
  res.send("add product ");
});

app.get('/api/products/:id', (req, res, next) => {
  db.products.find({
    id: req.params.id
  }, (err, docs) => {
    if (err) {
      res.status(503).send(err);
    } else if (docs.length == 0) {
      res.status(404).send();
    } else {
      res.json(docs);
    }
  });
});

app.put('/api/products/:id', (req, res, next) => {
  res.send("product by id " + req.params.id);
});
app.delete('/api/products/:id', (req, res, next) => {
  db.products.remove({
    id: req.params.id
  }, (err, status) => {
    if (err) {
      res.status(503).send(err);
      return;
    } else if (status.n == 0) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  });
});


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
