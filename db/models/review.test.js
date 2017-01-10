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

let review;

describe('MODELS: Review', function() {

  before('Wait for the db', () => db.didSync);

  beforeEach(() => {
    review = Review.build(testReview);
  });

  afterEach(() => db.sync({force: true}));

  it('has the expected schema definitions', function() {
    return review.save()
    .then((savedReview) => {
      expect(savedReview.title).to.equal(testReview.title);
      expect(savedReview.body).to.equal(testReview.body);
      expect(savedReview.rating).to.equal(testReview.rating);
    });
  });

  describe('validations', function() {
    it('doesn’t allow null titles', function() {
      review.title = null;

      return review.validate()
      .then((savedReview) => {
        expect(savedReview).to.be.an.instanceOf(Error);
        expect(savedReview.message).to.contain('title cannot be null');
      });
    });

    it('doesn’t allow blank titles', function() {
      review.title = '';

      return review.validate()
      .then((savedReview) => {
        expect(savedReview).to.be.an.instanceOf(Error);
        expect(savedReview.message).to.contain('notEmpty failed');
      });
    });

    it('doesn’t allow null bodies', function() {
      review.body = null;

      return review.validate()
      .then((savedReview) => {
        expect(savedReview).to.be.an.instanceOf(Error);
        expect(savedReview.message).to.contain('body cannot be null');
      });
    });

    it('doesn’t allow blank bodies', function() {
      review.body = '';

      return review.validate()
      .then((savedReview) => {
        expect(savedReview).to.be.an.instanceOf(Error);
        expect(savedReview.message).to.contain('notEmpty failed');
      });
    });

    it('doesn’t allow null ratings', function() {
      review.rating = null;

      return review.validate()
      .then((savedReview) => {
        expect(savedReview).to.be.an.instanceOf(Error);
        expect(savedReview.message).to.contain('rating cannot be null');
      });
    });

    // it('must have a rating of 1-5', function() {
    //   review.rating = '6';
    //
    //   return review.validate()
    //   .then((savedReview) => {
    //     console.log('ERROR????', savedReview);
    //     expect(savedReview).to.equal(null);
    //   });
    // });
  });
});
