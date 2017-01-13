/*eslint-disable*/
const bcrypt = require('bcrypt');
/*eslint-enable*/

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
  averageRating: {
    type: Sequelize.FLOAT,

  }
},
{
  getterMethods: {
    image: function() {
      const img = 1;
      //this.title.split(' ').join('-');
      const image = `/cereals/${img}.jpg`;
      return image;
    },
    category: function() {
      return this.calories < 200
      ? 'Healthy'
      : 'Hearty';
    },
  },
    instanceMethods: {
    getAverageRating: function() {
      return this.getReviews()
        .then(reviews => {
          let sum = 0;
          reviews.forEach(review => {
            sum += review.rating;
          });
          const averageRating = Math.floor(sum / reviews.length * 100) / 100;
          return averageRating;
        });
    }
  }
});
