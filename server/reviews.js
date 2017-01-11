'use strict';

const db = require('APP/db');
const Review = db.model('reviews');

const {mustBeLoggedIn, forbidden} = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next))
  .post('/', (req, res, next) => {
    Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next);
  })
  .get('/:reviewId', (req, res, next) =>
    Review.findById(req.params.reviewId)
    .then(review => res.json(review))
    .catch(next));
