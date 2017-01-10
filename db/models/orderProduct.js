const Sequelize = require('sequelize')
const db = require('APP/db');

const OrderProduct = db.define('orderProducts', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    priceAtPurchase: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
});

module.exports = OrderProduct;
