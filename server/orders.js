'use strict';

const db = require('APP/db');
const Order = db.model('orders');

const {forbidden} = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', forbidden('list all orders'), (req, res, next) =>
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))

  .post('/', (req, res, next) =>
    Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next))

  .get('/:orderId', (req, res, next) =>
    Order.findById(req.params.orderId)
    .then(order => res.json(order))
    .catch(next))

  .put('/:orderId', (req, res, next) =>
  Order.update(req.body, {
    where: { id: req.params.orderId },
    returning: true
  })
  .spread((rowCount, updatedReviews) => {
    res.json(updatedReviews[0]);
  })
  .catch(next))

  .delete('/:orderId', (req, res, next) =>
    Order.destroy({ where: { id: req.params.orderId }})
    .then(() => res.status(204).send('Deleted order!!'))
    .catch(next))
