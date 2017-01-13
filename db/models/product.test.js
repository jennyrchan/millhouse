/* eslint-disable no-unused-expressions, no-unused-vars */
'use strict';

const expect = require('chai').expect;
const Promise = require('bluebird');
const loremIpsum = require('lorem-ipsum');

const bcrypt = require('bcrypt');
const db = require('APP/db');
const Product = require('./product');
const Review = require('./review');

const testProduct = {
  title: 'Original Cheerios',
  summary: loremIpsum({count: 100, units: 'words'}),
  price: 599,
  inventory: 80,
  calories: 100,
  sugar: 1,
  fiber: 17,
  protein: 2,
};

let product;

const reviewRatings = [4, 3, 5, 5, 2, 5, 5];

describe('MODELS: Product', function() {

  before('Wait for the db', () => db.didSync);

  beforeEach(() => {
    product = Product.build(testProduct);
  });

  afterEach(() => db.sync({force: true}));

  it('has the expected schema definitions', function() {
    return product.save()
    .then(function(savedProduct) {
      expect(savedProduct.title).to.equal(testProduct.title);
      expect(savedProduct.summary).to.equal(testProduct.summary);
      expect(savedProduct.price).to.equal(testProduct.price);
      expect(savedProduct.inventory).to.equal(testProduct.inventory);
      expect(savedProduct.calories).to.equal(testProduct.calories);
      expect(savedProduct.sugar).to.equal(testProduct.sugar);
      expect(savedProduct.fiber).to.equal(testProduct.fiber);
      expect(savedProduct.protein).to.equal(testProduct.protein);
    });
  });

  xit('converts an image filename to a full URL', function() {

    const imgName = testProduct.title.split(' ').join('-');

    return product.save()
    .then(function(savedProduct) {
      expect(savedProduct.image).to.equal(`http://millhouse/img/${imgName}.jpeg`);
    });
  });

  it('infers a category for the product', function() {
    return product.save()
    .then(function(savedProduct) {
      expect(savedProduct.category).to.equal('Healthy');
    });
  });

  it('averages user review ratings', function() {

    const testReviews = [{
      title: 'Cheerios are amazing!',
      body: loremIpsum({count: 200, units: 'words'}),
      rating: '5',
      product_id: 1
    }, {
      title: 'Cheerios are fine.',
      body: loremIpsum({count: 200, units: 'words'}),
      rating: '2',
      product_id: 1
    }];

    return product.save()
    .then(savedProduct => {
      return Review.bulkCreate(testReviews);
    })
    .then(() => {
      return Product.findById(1);
    })
    .then(foundReview => foundReview.getAverageRating())
    .then(averageRating => {
      expect(averageRating).to.equal(3.50);
    });
  });
});
