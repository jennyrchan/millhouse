'use strict';

const db = require('APP/db');
const Review = db.model('reviews');

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters');

module.exports = require('express').Router()
  .get('/', forbidden('list all reviews'), (req, res, next) =>
    Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next))

  .post('/', mustBeLoggedIn, (req, res, next) => {
    req.body.user_id = req.user.id;

    return Review.create(req.body)
    .then(review => res.status(201).json(review))
    .catch(next);
  })

  .get('/:reviewId', (req, res, next) =>
    Review.findById(req.params.reviewId)
    .then(review => res.json(review))
    .catch(next))

  .delete('/:reviewId', selfOnly('delete your own reviews'), (req, res, next) =>
    Review.destroy({ where: { id: req.params.reviewId }})
    .then(() => res.status(204).send('Deleted review!!'))
    .catch(next))

  .put('/:reviewId', selfOnly('edit your own reviews'), (req, res, next) =>
    Review.update(req.body, {
      where: { id: req.params.reviewId },
      returning: true
    })
    .spread((rowCount, updatedReviews) => {
      res.json(updatedReviews[0]);
    })
    .catch(next));
