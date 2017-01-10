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
const OrderProduct = require('./orderProduct');

describe('Order', () => {
    before('wait for the db', () => db.didSync);

    const testOrder = {}

    const productOne = {
      title: 'Halal Food',
      summary: "YUMMY",
      price: 3
    }

    const productTwo = {
      title: 'Dig Inn',
      summary: "Not yummy",
      price: 2
    }

    const orderProductOne = {
      quantity: 1,
      priceAtPurchase: 3,
      order_id: 1,
      product_id: 1
    }

    const orderProductTwo = {
      quantity: 1,
      priceAtPurchase: 2,
      order_id: 1,
      product_id: 2
    }

    beforeEach('create productOne', () => Product.create(productOne));
    beforeEach('create productTwo', () => Product.create(productTwo));
    beforeEach('create testOrder', () => Order.create(testOrder));
    beforeEach('create orderProductOne', () => OrderProduct.create(orderProductOne));
    beforeEach('create orderProductTwo', () => OrderProduct.create(orderProductTwo));
    afterEach('remove testOrder', () => db.sync({ force: true }));

    describe('model', () => {

        it('checks to make sure totalPrice is sum of products', () => {
            return Order.findById(1)
                .then(order => {
                    return order.getTotalPrice();
                })
                .then(sum => {
                    expect(sum).to.equal(5);
                }, err => {
                    console.log('ERROR', err);
                })
        });

    });
});

