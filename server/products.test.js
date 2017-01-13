const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const app = require('./start');
const User = require('APP/db/models/user');
const Product = require('APP/db/models/product');
const Review = require('APP/db/models/review');
const {
        testUser1,
        testUser2,
        testProduct1,
        testProduct2,
        testProduct3,
        testReview1,
        testReview2
       } = require('./fakeTestData');

describe('/api/products', function() {

  let user1, user2, product1, product2, review1, review2;

  before('Wait for the db', () => db.didSync);

  beforeEach(() => {
    return User.bulkCreate([testUser1, testUser2], {returning: true})
    .then(createdUsers => {
      user1 = createdUsers[0];
      user2 = createdUsers[1];
    });
  });

  beforeEach(() => {
    return Product.bulkCreate([testProduct1, testProduct2], {returning: true})
    .then(createdProducts => {
      product1 = createdProducts[0];
      product2 = createdProducts[1];
    });
  });

  beforeEach(() => {
    return Review.bulkCreate([testReview1, testReview2], {returning: true})
    .then(createdReviews => {
      review1 = createdReviews[0];
      review2 = createdReviews[1];
    });
  });

  afterEach(() => db.sync({ force: true }));

  it('GETS all products', () => {
    request(app)
      .get('/api/products')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body[0].title).to.be.equal(product1.title);
        expect(res.body[1].title).to.be.equal(product2.title);
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

  it('DELETES a product by id', (done) => {
    request(app)
      .delete('/api/products/1')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        Product.findById(1)
        .then(foundProduct => {
          expect(foundProduct).to.be.equal(null);
          done();
        })
        .catch(done);
      });
  });

  it('PUTS a product by id', () => {
    request(app)
      .put('/api/products/1')
      .send({ title: 'new title for product 1' })
      .expect(200)
      .then(res => {
        expect(res.body.title).to.be.equal('new title for product 1');
      });
  });

  it('GETS all reviews for selected product', () => {
    request(app)
      .get('/api/products/1/reviews')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.be.equal(2);
        expect(res.body[0].title).to.be.equal(review1.title);
        expect(res.body[1].title).to.be.equal(review2.title);
      });
  });

});
