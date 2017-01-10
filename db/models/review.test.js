/* eslint-disable no-unused-expressions, no-unused-vars */
'use strict';

const expect = require('chai').expect;
const Promise = require('bluebird');
const loremIpsum = require('lorem-ipsum');

const bcrypt = require('bcrypt');
const db = require('APP/db');
const Review = require('./review');

const testReview = {
  title: 'Cheerios are amazing!',
  body: loremIpsum({count: 200, units: 'words'}),
  rating: '5'
};

// const badReview = {
//
// }

describe('MODELS: Review', function() {

  before('Wait for the db', () => db.didSync);

  beforeEach(() => Review.create(testReview));

  afterEach(() => db.sync({force: true}));

  it('has the expected schema definitions', function() {
    return Review.findOne({
      where: {
        id: 1
      }
    })
    .then(function(foundReview) {
      expect(foundReview.title).to.equal(testReview.title);
      expect(foundReview.body).to.equal(testReview.body);
      expect(foundReview.rating).to.equal(testReview.rating);
    });
  });

});
