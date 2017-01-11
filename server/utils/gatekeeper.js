const HttpError = require('./HttpError');

const gatekeeper = {};

gatekeeper.isAuthor = function (req) {
  if (req.story) {
    return req.story.author_id === req.user.id;
  } else {
    return req.body.author_id === req.user.id;
  }
};

gatekeeper.assertLoggedIn = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    next(new HttpError(401));
  }
};

gatekeeper.assertAdmin = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (req.user.isAdmin) {
    next();
  } else {
    next(new HttpError(403));
  }
};

gatekeeper.assertAuthor = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (gatekeeper.isAuthor(req)) {
    next();
  } else {
    next(new HttpError(403));
  }
};

gatekeeper.assertSelf = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (req.requestedUser.id === req.user.id) {
    next();
  } else {
    next(new HttpError(403));
  }
};

gatekeeper.assertAdminOrAuthor = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (gatekeeper.isAuthor(req) || req.user.isAdmin) {
    next();
  } else {
    next(new HttpError(403));
  }
};

gatekeeper.assertAdminOrSelf = function (req, res, next) {
  if (!req.user) {
    next(new HttpError(401));
  } else if (req.requestedUser.id === req.user.id || req.user.isAdmin) {
    next();
  } else {
    next(new HttpError(403));
  }
};

module.exports = gatekeeper;
