import { accessControl } from '../services/daffodil.services/accessControl';

const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../utils/APIError');

const ADMIN = 'admin';
const LOGGED_USER = '_loggedUser';

const handleJWT = (req, res, next, accessType) => async (err, user, info) => {
  const error = err || info;
  const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });
  console.log('user------->', user);
  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }
  const access = accessControl.verify({
    user, accessType, table: req.params.collection,
  });
  console.log('access', access);
  if (!access.allowed) {
    apiError.status = httpStatus.FORBIDDEN;
    apiError.message = 'Forbidden';
    return next(apiError);
  } else if (err || !user) {
    return next(apiError);
  }

  req.user = user;
  req.access = access;

  return next();
};

exports.ADMIN = ADMIN;
exports.LOGGED_USER = LOGGED_USER;

exports.authorize = accessType => (req, res, next) =>
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next, accessType),
  )(req, res, next);

exports.accessControl = accessRequired => (req, res, next) => {
  const { user } = req;
};

exports.oAuth = service =>
  passport.authenticate(service, { session: false });
