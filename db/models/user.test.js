'use strict'

const db = require('APP/db')
const User = require('./user')
const {expect} = require('chai')
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);

describe('User', () => {
  before('wait for the db', () => db.didSync);

  beforeEach('createTestUser', () => User.create(testUser));
  afterEach('remove createTestUser', () => db.sync({force:true}));

    const testUser = {
          id: 1,
          username: 'testing',
          first_name: 'Test',
          last_name: 'Ing',
          type: true,
          email: 'testing@me.com',
          shipping_address: 'address',
          billing_address: 'billing',
          password: 'ok',
          created_at: new Date(),
          updated_at: new Date(),
        };

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true))

    it("resolves false if the password doesn't match", () =>
      User.create({ password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false))
  });

  describe('user model', () => {

    it('has the expected schema definition', () => {
      expect(User.attributes.email).to.be.an('object');
    });

    describe('validations', () => {
      it('require username, first name, last name, email, shipping address, billing address, password', () => {
        const user = User.build();
        return user.validate()
          .then(err => {
            expect(err).to.be.an('object');
            expect(err.errors).to.contain.a.thing.with.properties({
              type: 'notNull Violation'
            });
          });
      });

      it('passes with fake user data in appropriate categories', (done) => {
        User.findOne({
          where: {
            id: 1
          }
        })
          .then(user => {
            expect(user.username).to.equal(testUser.username);
            expect(user.first_name).to.equal(testUser.first_name);
            expect(user.last_name).to.equal(testUser.last_name);
            expect(user.type).to.equal(testUser.type);
            expect(user.email).to.equal(testUser.email);
            expect(user.shipping_address).to.equal(testUser.shipping_address);
            expect(user.billing_address).to.equal(testUser.billing_address);
            //expect(user.password_digest).to.equal(testUser.password); authentication tests this already?\
            done();
          });
      });

      it('gets fullName', (done) => {
        let fullName = testUser.first_name + " " + testUser.last_name;
        User.findOne({
          where: {
            id:1
          }
        })
        .then(user => {
          expect(user.fullName).to.equal(fullName);
          done();
        })




      })

    });
  });
});

