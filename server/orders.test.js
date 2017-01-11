const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const app = require('./start');
const Product = require('APP/db/models/product');
const User = require('APP/db/models/user');
const {
        testUser1,
        testUser2,
        testProduct1,
        testProduct2,
        testOrder1,
        testOrder2,
        testOrder3,
       } = require('./fakeTestData');


describe('/api/orders', function() {

  let user1, user2, product1, product2, order1, order2, order3;

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
    return Order.bulkCreate([testOrder1, testOrder2, testOrder3], {returning: true})
    .then(createdOrders => {
      order1 = createdOrders[0];
      order2 = createdOrders[1];
      order3 = createdOrders[2];
    });
  });

  afterEach(() => db.sync({ force: true }));

  it('GETS all reviews', () => {
    request(app)
      .get('/api/reviews')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body[0].title).to.be.equal(review1.title);
        expect(res.body[1].title).to.be.equal(review2.title);
      });
  });

  it('POSTS a review', () => {
    request(app)
      .post('/api/reviews')
      .send(testReview3)
      .expect(201)
      .then(res => {
        expect(res.body.title).to.be.equal('bad bad bad');
      });
  });

  it('GETS a review by id', () => {
    request(app)
      .get('/api/reviews/1')
      .expect(200)
      .then(res => {
        expect(res.body.title).to.be.equal(review1.title);
      });
  });

  it('DELETES a review by id', (done) => {
    request(app)
      .delete('/api/reviews/1')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        Review.findById(1)
        .then(foundReview => {
          expect(foundReview).to.be.equal(null);
          done();
        })
        .catch(done);
      });
  });

  it('PUTS a review by id', () => {
    request(app)
      .put('/api/reviews/1')
      .send({ title: 'new title for review 1' })
      .expect(200)
      .then(res => {
        expect(res.body.title).to.be.equal('new title for review 1');
      });
  });

});
