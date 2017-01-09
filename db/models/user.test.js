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
  before('wait for the db', () => db.didSync)

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

      it('passes with fake user data in appropriate categories', () => {
        const user = User.build({
          username: 'testing',
          first_name: 'Test',
          last_name: 'Ing',
          type: true,
          email: 'testing@me.com',
          shipping_address: 'address',
          billing_address: 'billing',
          password: 'password'
        });
        return user.validate()
          .then(user => {
            console.log(user);
            // expect(err).to.be.an('object');
            // expect(err.errors).to.contain.a.thing.with.properties({
            //   type: 'notNull Violation'
            // });
          });
      })
    });

  });

})
