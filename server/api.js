'use strict';
/*eslint-disable*/
const api = module.exports = require('express').Router();
/*es-lint-enable*/

const HttpError = require ('./HttpError');

api
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/products', require('./products'))
  .use('/reviews', require('./reviews'))
  .use('/orders', require('./orders'))

api.use(HttpError(404).middleware());

// Send along any errors
api.use((err, req, res, next) => {
  err.status = err.status || 500;
  console.error(err.stack);
  const html = [
    `<html><body>`,
    `<h2>ERROR: ${err.status} - ${err.message} </h2>`,
    // `<pre>${err.stack}</pre>`,
    `</body></html>`
  ].join('');
  res.status(err.status).send(html);
});

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
