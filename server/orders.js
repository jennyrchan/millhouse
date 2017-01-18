'use strict';

const db = require('APP/db');
const Order = db.model('orders');
const Product = db.model('products');
const OrderProduct = db.model('orderProducts');
const { forbidden, selfOnly } = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', forbidden('list all orders'), (req, res, next) =>
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))

  .post('/', (req, res, next) =>
    Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next))

  .get('/cart/:id', selfOnly('access your own shopping cart'), (req, res, next) =>
    Order.findOrCreate({
      where: {user_id: req.user.id, status: 'pending'},
      include: {model: Product}
    })
    .then((cart, created) => {
      res.status(200).json(cart);
    })
    .catch(next))

  .get('/:orderId', (req, res, next) =>
    Order.findById(req.params.orderId)
    .then(order => res.status(200).json(order))
    .catch(next))

  .post('/:orderId', (req, res, next) => {
    OrderProduct.create(req.body)
    .then(() => res.sendStatus(201))
    .catch(next);
  })

  .delete('/:orderId', (req, res, next) =>
    Order.destroy({ where: { id: req.params.orderId }})
    .then(() => res.sendStatus(204))
    .catch(next))
