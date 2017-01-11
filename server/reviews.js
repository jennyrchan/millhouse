'use strict';

const db = require('APP/db');
const Review = db.model('reviews');

const {mustBeLoggedIn, forbidden} = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next))
  .post('/', (req, res, next) =>
    Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next))
  .get('/:reviewId', (req, res, next) =>
    Review.findById(req.params.reviewId)
    .then(review => res.json(review))
    .catch(next))
  .delete('/:reviewId', (req, res, next) =>
    Review.destroy({ where: { id: req.params.reviewId }})
    .then(() => res.status(204).send('Deleted review!!'))
    .catch(next))
  .put('/:reviewId', (req, res, next) =>
    Review.update(req.body, {
      where: { id: req.params.reviewId },
      returning: true
    })
    .spread((rowCount, updatedReviews) => {
      res.json(updatedReviews[0]);
    })
    .catch(next))

// TODOS
// Only authenticated users can post, edit, and delete their own reviews
// Only admins can delete anyone's reviews
