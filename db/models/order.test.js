'use strict'

const db = require('APP/db')
const Order = require('./order')
const { expect } = require('chai')
import chai from 'chai';
import chaiProperties from 'chai-properties';
import chaiThings from 'chai-things';
chai.use(chaiProperties);
chai.use(chaiThings);
const Product = require('./product');

describe('Order', () => {
    before('wait for the db', () => db.didSync);

    const testOrder = {
      orderItems: [1,2]
    }

    const ProductOne = {
      title: 'Halal Food',
      summary: "YUMMY",
      price: 3
    }

    const ProductTwo = {
      title: 'Dig INN',
      summary: "Not yummy",
      price: 2
    }

    const OrderProductOne = {
      quantity: 1,
      price: 3,
      order_id: 1,
      product_id: 1
    }

    const OrderProductTwo = {
      quantity: 1,
      price: 2,
      order_id: 1,
      product_id: 2
    }

    beforeEach('create ProductOne', () => Product.create(ProductOne));
    beforeEach('create ProductTwo', () => Product.create(ProductTwo));
    beforeEach('create testOrder', () => Order.create(testOrder));
    afterEach('remove testOrder', () => db.sync({ force: true }));

    describe('model', () => {

        it('require orderItems, totalPrice to be not null', () => {
                const order = Order.build();
                return order.validate()
                    .then(err => {
                        expect(err).to.be.an('object');
                        expect(err.errors).to.contain.a.thing.with.properties({
                            type: 'notNull Violation'
                        });
                    });
        });

        it('checks to make sure totalPrice is sum of products', () => {
            return Order.findById(1)
                    .then(order => {
                      // console.log(order);
                      let totalPrice = ProductOne.price + ProductTwo.price;
                      expect(order.totalPrice).to.equal(totalPrice);
                    });
        });


    });


});

