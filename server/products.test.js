const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const Product = require('APP/db/models/product');
const app = require('./start');
const loremIpsum = require('lorem-ipsum');
const Review = require('APP/db/models/review');

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

describe('/api/products', function() {

  let product1, product2;

  before('Wait for the db', () => db.didSync);

  beforeEach(() => {
    return Product.bulkCreate([testProduct1, testProduct2], {returning: true})
    .then(createdProducts => {
      product1 = createdProducts[0];
      product2 = createdProducts[1];
    });
  });

  afterEach(() => db.sync({force: true}));

  it('GETS all products', () => {
    request(app)
      .get('/api/products')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
      });
  });

  it('POSTS a product', () => {
    request(app)
      .post('/api/products')
      .send(testProduct3)
      .expect(201)
      .then(res => {
        expect(res.body.title).to.be.equal('something else');
      });
  });

  it('GETS a product by id', () => {
    request(app)
      .get('/api/products/1')
      .expect(200)
      .then(res => {
        expect(res.body.title).to.be.equal(product1.title);
      });
  });

  it('DELETES a product by id', () => {
    request(app)
      .delete('/api/products/1')
      .expect(204)
  });

});


/*
xdescribe('/api/products', () => {
  describe('when not logged in', () => {
    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app)
        .get(`/api/products/1`)
        .expect(401)
    );

    it('POST creates a product', () =>
      request(app)
        .post('/api/products')
        .send({
          email: 'beth@secrets.org',
          password: '12345'
        })
        .expect(201)
    );

    it('POST redirects to the product it just made', () =>
      request(app)
        .post('/api/products')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          email: 'eve@interloper.com'
        }))
    );
  });
});
*/
