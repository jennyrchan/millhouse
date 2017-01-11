const HttpError = require ('./HttpError');
const colors = require('colors');

const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in')
  }
  next()
}

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`)
  }
  next()
}

const forbidden = message => (req, res, next) => {
  res.status(403).send(message)
};

const assertAdmin = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (req.user.userType === 'admin') {
    next();
  } else {
    next(new HttpError(403));
  }
};

const assertUser = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (req.user.userType === 'user') {
    next();
  } else {
    next(new HttpError(403));
  }
};

const assertGuest = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (req.user.userType === 'guest') {
    next();
  } else {
    next(new HttpError(403));
  }
};





module.exports = {mustBeLoggedIn, selfOnly, forbidden, assertAdmin, assertUser, assertGuest}
