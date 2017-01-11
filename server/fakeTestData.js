const loremIpsum = require('lorem-ipsum');

const testUser1 = {
    firstName: 'Test',
    lastName: 'Ing',
    userType: 'admin',
    email: 'testing@me.com',
    shippingAddress: 'shipping',
    billingAddress: 'billing',
    password: 'ok'
};

const testUser2 = {
    firstName: 'hello',
    lastName: 'world',
    userType: 'guest',
    email: 'hello@world.com',
    shippingAddress: 'shipping',
    billingAddress: 'billing',
    password: 'ok'
};

const testProduct1 = {
  title: 'Original Cheerios',
  summary: loremIpsum({count: 100, units: 'words'}),
  price: 599,
  inventory: 80,
  calories: 100,
  sugar: 1,
  fiber: 17,
  protein: 2,
};

const testProduct2 = {
  title: 'testy testerson',
  summary: 'asljag;jiagioja is what i want to say',
  price: 3,
  inventory: 5,
};

const testProduct3 = {
  title: 'something else',
  summary: 'im a third product buy me',
  price: 9000,
  inventory: 1,
};

const testReview1 = {
  title: 'great cereal choice',
  body: 'this is the coolest thing ever',
  rating: 5,
  user_id: 1,
  product_id: 1
};

const testReview2 = {
  title: 'bad cereal choice',
  body: 'nothing',
  rating: 1,
  user_id: 2,
  product_id: 1
};

const testReview3 = {
  title: 'bad bad bad',
  body: 'i am just a grumpy person',
  rating: 1,
  user_id: 2,
  product_id: 2
};

const testOrder1 = {
  status: 'processing',
  user_id: 1
};

const testOrder2 = {
  status: 'in transit',
  user_id: 1
};

const testOrder3 = {
  status: 'delivered',
  user_id: 2
};

module.exports = {
  testUser1,
  testUser2,
  testProduct1,
  testProduct2,
  testProduct3,
  testReview1,
  testReview2,
  testReview3,
  testOrder1,
  testOrder2,
  testOrder3,
};
