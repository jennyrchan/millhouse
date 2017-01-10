const bcrypt = require('bcrypt');

const Sequelize = require('sequelize');
const db = require('APP/db');
const Review = require('./review');

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
  averageRating: {
    type: Sequelize.STRING,
    defaultValue: '0.00'
  }
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
    averageRating: function() {
      let rating;

      Review.findAll({
        where: {
          product_id: this.id
        }
      })
      .then(reviews => {
        const sum = reviews.reduce((a, b) => {
          return Number(a.rating) + Number(b.rating);
        }, 0);

        rating = Math.floor(sum / reviews.length * 100) / 100;
      });

      return String(rating);
    }
  },
});
