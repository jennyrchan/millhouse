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
    defaultValue: 0,
  },
  calories: {
    type: Sequelize.INTEGER,
  },
  sugar: {
    type: Sequelize.INTEGER,
  },
  fiber: {
    type: Sequelize.INTEGER,
  },
  protein: {
    type: Sequelize.INTEGER,
  },
},
{
  getterMethods: {
    category: function() {
      return this.calories < 200
      ? 'Healthy'
      : 'Hearty';
    }
  }
});
