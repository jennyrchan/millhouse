'use strict';

const db = require('APP/db');
const Product = db.model('products');
const Review = db.model('reviews');

const {mustBeLoggedIn, forbidden} = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Product.findAll()
    .then(products => res.json(products))
    .catch(next))
  .post('/', (req, res, next) => // forbidden('only admins can create products') could go in the middle argument
    Product.create(req.body)
    .then(product => res.status(201).json(product))
    .catch(next))
  .get('/:productId', (req, res, next) =>
    Product.findById(req.params.productId)
    .then(product => res.json(product))
    .catch(next))
  .delete('/:productId', (req, res, next) => //forbidden('only admins can delete products') could go as a middle argument
    Product.destroy({where: {id: req.params.productId}})
    .then(() => res.status(204).send('Deleted product!!'))
    .catch(next))
  .put('/:productId', (req, res, next) => //forbidden('only admins can create products') could go as a middle argument
       Product.update(req.body, {where: {id: req.params.productId}})
        .then(updatedProduct => res.json(updatedProduct))
        .catch(next))
  .get('/:productId/reviews', (req, res, next) =>
    Review.findAll({where: {
      product_id: req.params.productId
    }}).then(reviews => res.json(reviews))
    .catch(next));
