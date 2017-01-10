'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Product = require('./product');

const Review = require('./review');
const Order = require('./order');
const OrderProduct = require('./orderProduct');

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Product);
Product.hasMany(Review);

Order.hasOne(User);
User.belongsTo(Order);

Order.belongsToMany(Product, {through: OrderProduct});
Product.belongsToMany(Order, {through: OrderProduct});

module.exports = {User, Product, Review, Order, OrderProduct};
