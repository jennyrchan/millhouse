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
  // averageRating: {
  //   type: Sequelize.FLOAT,
  //   defaultValue: 0.00
  // }
},
{
  getterMethods: {
    image: function() {
      const img = this.title.split(' ').join('-');
      return `http://millhouse/img/${img}.jpeg`;
    },
    category: function() {
      return this.calories < 200
      ? 'Healthy'
      : 'Hearty';
    },
    // averageRating: function(reviews) {
    //   console.log(typeof reviews);
    //   const sum = reviews.reduce((a, b) => {
    //     return a + b;
    //   }, 0);
    //
    //   return Math.floor(sum / reviews.length * 100) / 100;
    // }
  },
});
