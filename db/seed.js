'use strict';

const bcrypt = require('bcrypt');
const colors = require('colors');

const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('APP/db');
const User = require('APP/db/models/user');
const Review = require('APP/db/models/review');
const Product = require('APP/db/models/product');

const numUsers = 100;
const numOrders = 150;
const numReviews = 500;

const emails = chance.unique(chance.email, numUsers);
const products = require('./productsSeed');

// Generates random but valid product numbers
chance.prototype.product = function () {
  return chance.natural({ min: 1, max: products.length })
}

function doTimes (n, fn) {
  const results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto () {
  const g = chance.pick(['men', 'women']);
  const n = chance.natural({
    min: 0,
    max: 96
  });
  return `http://api.randomuser.me/portraits/${g}/${n}.jpg`;
}

function randUser () {
  return User.build({
    firstName: chance.first(),
    lastName: chance.last(),
    photo: randPhoto(),
    phoneNumber: chance.phone(),
    email: emails.pop(),
    billingAddress: chance.address(),
    shippingAddress: chance.address(),
    password: chance.word(),
    userType: chance.weighted(['guest', 'user', 'admin'], [20, 75, 5])
  });
}

function randTitle () {
  const numWords = chance.natural({ min: 3, max: 8 });
  return chance.sentence({words: numWords})
  .replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  })
  .slice(0, -1);
}

function randOrder (createdUsers) {
  const user = chance.pick(createdUsers);
  const products = chance.unique(chance.product(), chance.natural({min: 1, max: 6}));
  const order = Order.build({
    user_id: chance.natural({ min: 101, max: 104 }),
  })


  doTimes(numReviews, function () {
      return randReview(createdUsers);
    })

  return OrderProducts.build({
    quantity: chance.natural({ min: 1, max: 5}),
    order_id: order.id,
    product_id: products.pop(),
  })
}

function randReview (createdUsers) {
  const user = chance.pick(createdUsers);
  return Review.build({
    user_id: user.id,
    product_id: chance.product(),
    title: randTitle(),
    body: chance.paragraph(),
    rating: chance.integer({min: 1, max: 5})
  });
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    firstName: 'Brian',
    lastName: 'Nichols',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/zeke-astronaut.png',
    phoneNumber: '(212) 867-5309',
    billingAddress: chance.address(),
    shippingAddress: chance.address(),
    email: 'brian@brian.brian',
    password: '123',
    userType: 'guest'
  }));
  users.push(User.build({
    firstName: 'Colin',
    lastName: 'Jaffe',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phoneNumber: chance.phone(),
    billingAddress: chance.address(),
    shippingAddress: chance.address(),
    email: 'colin@colin.colin',
    password: '123',
    userType: 'admin'
  }));
  users.push(User.build({
    firstName: 'Jenny',
    lastName: 'Chan',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phoneNumber: chance.phone(),
    billingAddress: chance.address(),
    shippingAddress: chance.address(),
    email: 'jenny@jenny.jenny',
    password: '123',
    userType: 'admin'
  }));
  users.push(User.build({
    firstName: 'Richard',
    lastName: 'Shyong',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phoneNumber: chance.phone(),
    billingAddress: chance.address(),
    shippingAddress: chance.address(),
    email: 'rich@rich.rich',
    password: '123',
    userType: 'user'
  }));
  return users;
}

function generateOrders (createdUsers, createdProducts)

function generateOrdersAndReviews (createdUsers) {
  return {
    orders: doTimes(numOrders, function () {
      return randOrder(createdUsers);
    }),
    reviews: doTimes(numReviews, function () {
        return randReview(createdUsers);
      })
  };
}

function createUsers () {
  return Promise.map(generateUsers(), user => {
    return user.save();
  });
}

function createReviews (createdUsers) {
  return Promise.map(generateReviews(createdUsers), function (review) {
    return review.save();
  });
}

function seed () {
  return Product.bulkCreate(products)
    .then(createdProducts => createUsers())
    .then(createdUsers => createReviews(createdUsers));
}

db.didSync
  .then(() => db.sync({force: true}))
  .then(seed)
  .then(users => console.log(`Seeded ${users.length} users OK`.yellow))
  .catch(error => console.error(error))
  .finally(() => db.close())
