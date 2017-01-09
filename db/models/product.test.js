/* eslint-disable no-unused-expressions */
'use strict';

const expect = require('chai').expect;
const Promise = require('bluebird');
const loremIpsum = require('lorem-ipsum');

const bcrypt = require('bcrypt');
const db = require('APP/db');
const Product = require('./product');

const testProduct = {
  title: 'Original Cheerios',
  summary: loremIpsum({count: 100, units: 'words'}),
  price: 599,
  inventory: 80,
  calories: 100,
  sugar: 2,
  fiber: 4,
  protein: 10,
};

describe('Product', function() {

  before('Wait for the db', () => db.didSync);

  beforeEach(() => Product.create(testProduct));

  afterEach(() => db.sync({force: true}));

  it('has the expected schema definition', function() {
    return Product.findOne({
      where: {
        id: 1
      }
    })
    .then(function(foundProduct) {
      expect(foundProduct.title).to.equal(testProduct.title);
      expect(foundProduct.summary).to.equal(testProduct.summary);
      expect(foundProduct.price).to.equal(testProduct.price);
      expect(foundProduct.inventory).to.equal(testProduct.inventory);
      expect(foundProduct.calories).to.equal(testProduct.calories);
      expect(foundProduct.sugar).to.equal(testProduct.sugar);
      expect(foundProduct.fiber).to.equal(testProduct.fiber);
      expect(foundProduct.protein).to.equal(testProduct.protein);
    });
  });
});
