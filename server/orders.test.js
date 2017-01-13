const request = require('supertest-as-promised');
const {expect} = require('chai');
const db = require('APP/db');
const app = require('./start');
const User = require('APP/db/models/user');
const Product = require('APP/db/models/product');
const Order = require('APP/db/models/order');
const {
        testUser1,
        testUser2,
        testProduct1,
        testProduct2,
        testOrder1,
        testOrder2,
        testOrder3,
       } = require('./fakeTestData');


xdescribe('/api/orders', function() {

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
    });
  });

  afterEach(() => db.sync({ force: true }));

  it('GETS all orders', () => {
    request(app)
      .get('/api/orders')
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
        expect(res.body[0].title).to.be.equal(order1.title);
        expect(res.body[1].title).to.be.equal(order2.title);
      });
  });

  it('POSTS an order', () => {
    request(app)
      .post('/api/orders')
      .send(testOrder3)
      .expect(201)
      .then(res => {
        expect(res.body.status).to.be.equal('delivered');
      });
  });

  it('GETS an order by id', () => {
    request(app)
      .get('/api/orders/1')
      .expect(200)
      .then(res => {
        expect(res.body.status).to.be.equal(order1.status);
      });
  });

  it('DELETES an order by id', (done) => {
    request(app)
      .delete('/api/orders/1')
      .expect(204)
      .end((err, res) => {
        if (err) return done(err);
        Order.findById(1)
        .then(foundOrder => {
          expect(foundOrder).to.be.equal(null);
          done();
        })
        .catch(done);
      });
  });

  it('PUTS an order by id', () => {
    request(app)
      .put('/api/orders/1')
      .send({ status: 'in transit' })
      .expect(200)
      .then(res => {
        expect(res.body.status).to.be.equal('in transit');
      });
  });

});
