'use strict';
const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'canceled'),
    defaultValue: 'pending',
  }
}, {
    instanceMethods: {
      getTotalPrice
    }
});

function getTotalPrice() {
  let sum = 0;
  return this.getProducts()
    .then(productsArray => {
      productsArray.forEach(product => {
        sum += product.orderProducts.priceAtPurchase * product.orderProducts.quantity;
      });
      return sum;
    });
}

module.exports = Order;
