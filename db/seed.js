'use strict';

const bcrypt = require('bcrypt');
const colors = require('colors');

const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('APP/db');
const User = require('APP/db/user');
const Review = require('APP/db/review');
const Product = require('APP/db/product');
// const Order = require('APP/db/order');

const numUsers = 100;
const numReviews = 500;

const emails = chance.unique(chance.email, numUsers);
const products = require('./productsSeed.json');

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
    name: [chance.first(), chance.last()].join(' '),
    photo: randPhoto(),
    phone: chance.phone(),
    email: emails.pop(),
    billingAddress: chance.address(),
    shippingAddress: chance.address(),
    password: chance.word(),
    isAdmin: chance.weighted([true, false], [5, 95])
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

function randReview (createdUsers) {
  const user = chance.pick(createdUsers);
  const productId = chance.natural({ min: 1, max: products.length });
  return Review.build({
    author_id: user.id,
    product_id: productId,
    title: randTitle(),
    body: chance.paragraph()
  });
}

function generateUsers () {
  const users = doTimes(numUsers, randUser);
  users.push(User.build({
    firstName: 'Brian',
    lastName: 'Nichols',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/zeke-astronaut.png',
    phone: '(212) 867-5309',
    email: 'brian@brian.brian',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    firstName: 'Colin',
    lastName: 'Jaffe',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: chance.phone(),
    email: 'colin@colin.colin',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    firstName: 'Jenny',
    lastName: 'Chan',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: chance.phone(),
    email: 'jenny@jenny.jenny',
    password: '123'
  }));
  users.push(User.build({
    firstName: 'Richard',
    lastName: 'Shyong',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: chance.phone(),
    email: 'rich@rich.rich',
    password: '123'
  }));
  return users;
}

function generateReviews (createdUsers) {
  return doTimes(numReviews, function () {
    return randReview(createdUsers);
  });
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
    .then(createUsers())
    .then(createdUsers => {
      return createReviews(createdUsers);
  });
}

db.didSync
  .then(() => db.sync({force: true}))
  .then(seed)
  .then(users => console.log(`Seeded ${users.length} users OK`.yellow))
  .catch(error => console.error(error))
  .finally(() => db.close())
