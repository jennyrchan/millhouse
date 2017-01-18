const HttpError = require('./HttpError');

const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    next(new HttpError(401, 'You must be logged in.'));
  } else {
    next();
  }
};

const selfOnly = action => (req, res, next) => {
  if (!req.user) {
    next(new HttpError(401, 'You must be logged in.'));
  } else if (req.user.userType !== 'admin') {
    if (Number(req.params.id) !== req.user.id) {
      next(new HttpError(403, `You can only ${action}.`));
    } else {
      next();
    }
  } else {
    next();
  }
};

const forbidden = message => (req, res, next) => {
  if (!req.user) {
    next(new HttpError(401, 'You must be logged in.'));
  } else if (req.user.userType === 'admin') {
    next();
  } else {
    next(new HttpError(403, `Only admins can ${message}`));
  }
};

module.exports = { mustBeLoggedIn, selfOnly, forbidden };
