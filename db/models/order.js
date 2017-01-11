'use strict';
const Sequelize = require('sequelize');
const db = require('APP/db');

const Order = db.define('orders', {
  status: {
    type: Sequelize.ENUM('processing', 'canceled', 'in transit', 'delivered'),
    defaultValue: 'processing',
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

// Notes for when we make a route to add items to shopping cart
// Order.create()
// .then(createdOrder => {
//   createdOrder.addProduct(someObjectWithProductIdQuantityAndPrice)
// })

