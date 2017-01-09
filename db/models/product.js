const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const db = require('APP/db');

module.exports = db.define('products', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  summary: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  inventory: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  calories: {
    type: Sequelize.INTEGER,
  },

});
