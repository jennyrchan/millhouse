'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db');
const Product = require('./product');

const Order = db.define('orders', {
    orderItems: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: false,
      set: function(val) {
        findTotalSum();
        this.setDataValue('totalPrice', val);
      }
    },
    totalPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
}, {
    instanceMethods: {
      getTotalPrice: findTotalSum
    }
});

function findTotalSum(order) {
  let allItems = order.orderItems;
  let sum = 0;
  for (let e of allItems) {
    Product.findById(e)
    .then(product => {
      sum += product.price;
    })
    .then(() => {
      return sum;
    });
  }
}

module.exports = Order;
