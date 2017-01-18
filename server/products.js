'use strict';

const db = require('APP/db');
const Product = db.model('products');
const Review = db.model('reviews');
const { mustBeLoggedIn, forbidden } = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Product.findAll()
    .then(products => res.json(products))
    .catch(next))

  .post('/', forbidden('add products'), (req, res, next) =>
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next))

  .get('/:productId', (req, res, next) =>
    Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next))

  .delete('/:productId', (req, res, next) =>
    Product.destroy({ where: { id: req.params.productId }})
    .then(() => res.status(204).send('Deleted product!!'))
    .catch(next))

  .put('/:productId', (req, res, next) =>
    Product.update(req.body, {
      where: { id: req.params.productId },
      returning: true
    })
    .spread((rowCount, updatedProducts) => {
      res.json(updatedProducts[0]);
    })
    .catch(next))

  .get('/:productId/reviews', (req, res, next) =>
    Review.findAll({ where: { product_id: req.params.productId }})
    .then(reviews => res.json(reviews))
    .catch(next))

  .post('/:productId/review', mustBeLoggedIn, (req, res, next) => {
    req.body.product_id = req.params.productId;
    Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next);
  });
