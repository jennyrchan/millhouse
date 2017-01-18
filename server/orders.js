'use strict';

const db = require('APP/db');
const Order = db.model('orders');
const Product = db.model('products');
const OrderProduct = db.model('orderProducts');

const {forbidden, selfOnly} = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', forbidden('list all orders'), (req, res, next) =>
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))

  .post('/', (req, res, next) =>
    Order.create(req.body)
    .then(order => res.status(201).json(order))
    .catch(next))

  // Get the user's shopping cart
  .get('/cart/:id', selfOnly('access your own shopping cart'), (req, res, next) =>
    Order.findOrCreate({
      where: {user_id: req.user.id, status: 'pending'},
      include: {model: Product}
    })
    .then((cart, created) => res.status(200).json(cart))
    .catch(next))

  // Add new product to the shopping cart
  .put('/cart/:id/product/:productId', (req, res, next) => {
    console.log(req.body);
    Order.find({
      where: {user_id: req.params.id, status: 'pending' },
      include: [
        { model: Product }]
      })
      .then(order => {
        const product = {
          quantity: req.body.quantity,
          priceAtPurchase: req.body.priceAtPurchase,
          product_id: req.params.productId,
          order_id: order.id
        };
        return OrderProduct.create(product);
      })
      .then((product) => res.sendStatus(201))
      .catch(next);
  })

  // Delete a product from the shopping cart
  .delete('/cart/:id/product/:productId', (req, res, next) => {
    Order.find({
      where: {user_id: req.params.id, status: 'pending' }
      })
      .then(order => {
        return OrderProduct.destroy({
          where: {order_id: order.id, product_id: req.params.productId}
        });
      })
      .then(() => res.sendStatus(204))
      .catch(next);
  })

  // Increase or decrease quantity of a product in the shopping cart
  .put('/cart/:id/product/:productId/:math', (req, res, next) => {
    Order.find({
      where: {user_id: req.params.id, status: 'pending' },
      include: [
        { model: Product,
          where: { id: req.params.productId }}]
      })
      .then(order => {
        return OrderProduct.find({
          where: {
            product_id: req.params.productId,
            order_id: order.id }
          })
      })
      .then(orderProduct => {
        console.log(orderProduct);
        let quantity = orderProduct.quantity
        if (req.params.math === 'plus') {
          console.log('INCREASING');
          quantity++
        } else if (req.params.math === 'minus') {
          console.log('DECREASING!');
          quantity--
        }
        return orderProduct.update({ quantity })
      })
      .then(() => res.sendStatus(202))
      .catch(next);
  })

  // Checkout with the current shopping cart
  .put('/cart/:id/checkout', selfOnly('check yoursself out ;)'), (req, res, next) => {
    Order.findById(req.body.orderId)
      .then(cart => cart.update(req.body))
      .then(order => res.sendStatus(200))
      .catch(next)
  })

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
