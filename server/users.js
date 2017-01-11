'use strict';

const db = require('APP/db');
const User = db.model('users');

const {mustBeLoggedIn, selfOnly, forbidden, assertAdmin, assertUser, assertGuest} = require('./auth.filters');

module.exports = require('express').Router()
	.get('/', assertAdmin, (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))

	.post('/', assertAdmin, (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))

	.get('/:id', assertAdmin, (req, res, next) =>
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))

	.get('/orders', assertUser, (req, res, next) =>
		User.findById(req.user.id)
		.then(user => user.getOrders())
		.then(orders => res.json(orders))
		.catch(next));

	//TODO: user route by id should only be accessibly by that logged in user... there's a self-only thing we could use here
