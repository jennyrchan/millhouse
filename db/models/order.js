'use strict'

const db = require('APP/db');

const Order = db.define('orders', {}, {
    instanceMethods: {
      getTotalPrice
    }
});

function getTotalPrice(order) {
  let sum = 0;
  return this.getProducts()
    .then(productsArray => {
      productsArray.forEach(product => {
        sum += product.orderProducts.priceAtPurchase * product.orderProducts.quantity;
      })
      return sum;
    });
}

module.exports = Order;

// Notes for when we make a route to add items to shopping cart
// Order.create()
// .then(createdOrder => {
//   createdOrder.addProduct(someObjectWithProductIdQuantityAndPrice)
// })

