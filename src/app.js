// import express from 'express';
// import path from 'path';
// const path = require('path');
const express = require('express');
let { products } = require('./data');
// const logger = require('./logger');

const app = express();
app.use(express.json());

// setup static and middleware
// app.use(express.static('public'));

// Define routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/about', (req, res) => {
//   res.status(200).send('Welcome to Express!');
// });

// app.all('*', (req, res) => {
//   res.status(404).send('Resource not found!');
// });

//middleware
// app.use(logger);

// app.get('/', logger, (req, res) => {
//   res.send('<h1>Products API</h1><a href="/api/products">products</a>');
//   // res.status(200).json(products);
// });

app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === Number(id));
  if (!product) {
    return res.status(404).send('Product not found!');
  }
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const data = req.body;
  if (!(data.name && data.price && data.image && data.desc)) {
    return res.status(400).send('Missing data!');
  }
  products.push({ id: products.length + 1, ...data });
  res.status(201).json(products[products.length - 1]);
});

app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;

  if (!(data.name && data.price && data.image && data.desc && id <= products.length)) {
    return res.status(400).send('Bad request! Missing/Invalid data');
  }
  products[id - 1] = { id, ...data };
  res.status(201).json(products[id - 1]);
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  if (Number(id) > products.length || Number(id) < 1) {
    return res.status(400).send('Bad request! Invalid id');
  }
  products = products.filter((product) => product.id !== Number(id));

  res.status(204).json();
});

// app.get('/api/v1/query', (req, res) => {
//   const { search, limit } = req.query;
//   let sortedProducts = [...products];
//   if (search) {
//     sortedProducts = sortedProducts.filter((product) => {
//       return product.name.startsWith(search);
//     });
//   }
//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, Number(limit));
//   }
//   if (sortedProducts.length < 1) {
//     return res.status(200).send('No products found!');
//   }
//   res.json(sortedProducts);
// });

// export default app;
module.exports = app;
