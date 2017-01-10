const Sequelize = require('sequelize')
const db = require('APP/db');

const OrderProduct = db.define('orderProducts', {
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
});

module.exports = OrderProduct;
