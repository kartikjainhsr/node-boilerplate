import mongooseModel from '../mongoose.model';

const { omit } = require('lodash');

// const { handler: errorHandler } = require('../../middlewares/error');

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const Collection = mongooseModel.getCollection('User');
    const user = await Collection.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get user
 * @public
 */
exports.get = async (id) => {
  const Collection = mongooseModel.getCollection('User');

  return Collection.get(id);
};

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());
