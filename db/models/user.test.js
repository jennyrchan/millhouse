'use strict'

const db = require('APP/db')
const User = require('./user')
const { expect } = require('chai')
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);

describe('MODELS: User', () => {
    before('wait for the db', () => db.didSync);

    const testUser = {
        firstName: 'Test',
        lastName: 'Ing',
        isAdmin: true,
        email: 'testing@me.com',
        shippingAddress: 'shipping',
        billingAddress: 'billing',
        password: 'ok'
    };

    beforeEach('create testUser', () => User.create(testUser));
    afterEach('remove testUser', () => db.sync({ force: true }));

    xdescribe('authenticate(plaintext: String) ~> Boolean', () => {
        it('resolves true if the password matches', () =>
            User.create({ password: 'ok' })
            .then(user => user.authenticate('ok'))
            .then(result => expect(result).to.be.true))

        it("resolves false if the password doesn't match", () =>
            User.create({ password: 'ok' })
            .then(user => user.authenticate('not ok'))
            .then(result => expect(result).to.be.false))
    });

    it('has the expected schema definitions', () => {
        return User.findOne({
                where: {
                    id: 1
                }
            })
            .then(user => {
                expect(user.firstName).to.equal(testUser.firstName);
                expect(user.lastName).to.equal(testUser.lastName);
                expect(user.isAdmin).to.equal(testUser.isAdmin);
                expect(user.email).to.equal(testUser.email);
                expect(user.shippingAddress).to.equal(testUser.shippingAddress);
                expect(user.billingAddress).to.equal(testUser.billingAddress);
                //expect(user.password_digest).to.equal(testUser.password); authentication tests this already?\
            });
    });

    describe('validations', () => {
        it('require first name, last name, email, shipping address, billing address, and password to not be null', () => {
            const user = User.build();
            return user.validate()
                .then(err => {
                    expect(err).to.be.an('object');
                    expect(err.errors).to.contain.a.thing.with.properties({
                        type: 'notNull Violation'
                    });
                });
        });

        it('can get fullName', () => {
            let fullName = testUser.firstName + " " + testUser.lastName;
            return User.findOne({
                    where: {
                        id: 1
                    }
                })
                .then(user => {
                    expect(user.fullName).to.equal(fullName);
                })
        })

        it('check that email is unique', () => {
          const newUser = Object.assign({}, testUser)
          const userWithSameEmail = User.build(newUser);
          return userWithSameEmail.save()
            .then(() => {
              throw new Error('email validation did not trigger');
            }, (err) => {
                expect(err).to.be.an('object');
                expect(err.errors).to.contain.a.thing.with.properties({
                    message: 'email must be unique'
                });
            });
        });
    });
});
