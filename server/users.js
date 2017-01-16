'use strict';

const db = require('APP/db');
const User = db.model('users');
const Orders = db.model('orders');

const {selfOnly, forbidden} = require('./auth.filters');

module.exports = require('express').Router()
	.get('/', forbidden('list all users.'), (req, res, next) =>
		User.findAll()
		.then(users => res.json(users))
		.catch(next))

	.post('/', (req, res, next) =>
		User.create(req.body)
		.then(user => res.status(201).json(user))
		.catch(next))

	.get('/:id', selfOnly('view your own profile'), (req, res, next) =>
		User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(next))

	.put('/:id', selfOnly('update your own data'), (req, res, next) =>
		User.update(req.body, {
			where: { id: req.params.id},
			returning: true})
		.spread((rowCount, updatedUser) => {
			res.json(updatedUser[0]);
		})
		.catch(next))

	.delete('/:id', selfOnly('delete your own account'), (req, res, next) =>
		User.destroy({where: { id: req.params.id }})
		.then(() => res.status(204).send('User deleted'))
		.catch(next))

	.get('/:id/orders', selfOnly('view your own orders'), (req, res, next) =>
		User.findById(req.params.id)
		.then(user => user.getOrders())
		.then(orders => orders.map(order => {
			return order.getProducts({include: [{model: Orders}]})
						.then(orderProduct => res.json(orderProduct));
		}))
		.catch(next))

	.get('/:id/reviews', (req, res, next) => {
		User.findById(req.params.id)
		.then(user => user.getReviews())
		.then(reviews => res.json(reviews))
		.catch(next);
	});

