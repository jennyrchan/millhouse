const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const db = require('APP/db');

module.exports = db.define('reviews', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      min: 1,
      max: 5
    },
  }
});
