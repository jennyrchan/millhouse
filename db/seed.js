'use strict';

const chance = require('chance')(123);
const Promise = require('bluebird');

const db = require('APP/db');
const User = require('APP/db/user');
const Review = require('APP/db/review');
const Order = require('APP/db/order');

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
    password: chance.word(),
    isAdmin: chance.weighted([true, false], [5, 95])
  });
}

function randTitle () {
  const numWords = chance.natural({
    min: 1,
    max: 8
  });
  return chance.sentence({words: numWords})
  .replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  })
  .slice(0, -1);
}

function randReview (createdUsers) {
  const user = chance.pick(createdUsers);
  return Review.build({
    author_id: user.id,
    title: randTitle(),
    body: chance.paragraph()
  });
}

function generateUsers () {
  let users = doTimes(numUsers, randUser);
  users.push(User.build({
    name: 'Brian Nichols',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/zeke-astronaut.png',
    phone: '(914) 886-2284',
    email: 'brian@brian.brian',
    password: '123',
    isAdmin: true
  }));
  users.push(User.build({
    name: 'Colin Jaffe',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: '(781) 854-8854',
    email: 'colin@colin.colin',
    password: '123'
  }));
  users.push(User.build({
    name: 'Jenny Chan',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: '(212) 867-5309',
    email: 'jenny@jenny.jenny',
    password: '123'
  }));
  users.push(User.build({
    name: 'Richard Shyong',
    photo: 'http://learndotresources.s3.amazonaws.com/workshop/55e5c92fe859dc0300619bc8/sloth.jpg',
    phone: '(781) 854-8832',
    email: 'rich@rich.rich',
    password: '123'
  }));
  return users;
}

const seedUsers = () => db.Promise.map(generateUsers(), user => db.model('users').create(user))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
