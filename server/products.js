'use strict';

const db = require('APP/db');
const Product = db.model('products');
const Review = db.model('rewviews')

const {mustBeLoggedIn, forbidden} = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Product.findAll()
    .then(products => res.json(products))
    .catch(next))
  .post('/', forbidden('only admins can create products'), (req, res, next) =>
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next))
  .get('/:id', (req, res, next) =>
    Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next))
  .get('/:id/reviews', (req, res, next) =>
    Review.findAll({where: {
      product_id: req.params.id
    }).then(reviews => res.json(reviews))
    .catch(next);
