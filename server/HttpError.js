'use strict';

var http = require('http');

function HttpError (status, message) {
  var err = new Error(message || http.STATUS_CODES[status]);
  err.status = status;
  Object.setPrototypeOf(err, HttpError.prototype);
  return err;
}

Object.setPrototypeOf(HttpError.prototype, Error.prototype);

HttpError.prototype.middleware = function () {
  var self = this;
  return function (req, res, next) {
    next(self);
  }
};

module.exports = HttpError;
