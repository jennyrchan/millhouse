'use strict'

const db = require('APP/db')
const User = require('./user')
const { expect } = require('chai')
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);

describe('User', () => {
    before('wait for the db', () => db.didSync);

    const testUser = {
        first_name: 'Test',
        last_name: 'Ing',
        type: true,
        email: 'testing@me.com',
        shipping_address: 'shipping',
        billing_address: 'billing',
        password: 'ok'
    };

    beforeEach('create testUser', () => User.create(testUser));
    afterEach('remove testUser', () => db.sync({ force: true }));

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

    describe('model', () => {

        it('has the expected schema definition', () => {
            expect(User.attributes.email).to.be.an('object');
        });

        describe('validations', () => {
            it('require first name, last name, email, shipping address, billing address, password', () => {
                const user = User.build();
                return user.validate()
                    .then(err => {
                        expect(err).to.be.an('object');
                        expect(err.errors).to.contain.a.thing.with.properties({
                            type: 'notNull Violation'
                        });
                    });
            });

            it('has fake user data in appropriate categories', () => {
                return User.findOne({
                        where: {
                            id: 1
                        }
                    })
                    .then(user => {
                        expect(user.first_name).to.equal(testUser.first_name);
                        expect(user.last_name).to.equal(testUser.last_name);
                        expect(user.type).to.equal(testUser.type);
                        expect(user.email).to.equal(testUser.email);
                        expect(user.shipping_address).to.equal(testUser.shipping_address);
                        expect(user.billing_address).to.equal(testUser.billing_address);
                        //expect(user.password_digest).to.equal(testUser.password); authentication tests this already?\

                    });
            });

            it('get fullName', () => {
                let fullName = testUser.first_name + " " + testUser.last_name;
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
});
