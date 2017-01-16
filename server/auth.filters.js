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
  } else if (req.user.userType !== 'admin'
&& Number(req.params.id) !== req.user.id) {
    next(new HttpError(403, `You can only ${action}.`));
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

// const assertAdmin = message => (req, res, next) => {
//   if (!req.user) {
//     next(new HttpError(401, 'User not found'));
//   } else if (req.user.userType === 'admin') {
//     next();
//   } else {
//     next(new HttpError(403, message));
//   }
// };
//
// const assertUser = function (req, res, next) {
//   if (!req.user) {
//     next(new HttpError(401));
//   } else if (req.user.userType === 'user') {
//     next();
//   } else {
//     next(new HttpError(403));
//   }
// };
//
// const assertGuest = function (req, res, next) {
//   if (!req.user) {
//     next(new HttpError(401));
//   } else if (req.user.userType === 'guest') {
//     next();
//   } else {
//     next(new HttpError(403));
//   }
// };

module.exports = {mustBeLoggedIn, selfOnly, forbidden};
