import mongooseModel from '../mongoose.model';
import API_STORE from '../api.store';

const { omit } = require('lodash');

// const User = require('./user.model');
// const { handler: errorHandler } = require('../../middlewares/error');

/**
 * Load user and append to req.
 * @public
 */
// exports.load = async (req, res, next, id) => {
// try {
//   console.log(12);
//   const user = await User.get(id);
//   req.locals = { user };
//   return next();
// } catch (error) {
//   return errorHandler(error, req, res);
// }
// };

/**
 * Get user
 * @public
 */
exports.get = async ({
  query, body, params, user, access,
}) => {
  console.log('query, body, params, user,', query, body, params, user, access);
  try {
    const Collection = mongooseModel.getCollection(params.collection);
    const data = mongooseModel.queryMakerAndValidator({ access, user, reqParams: { ...query, ...params, ...body } });
    const users = await Collection.get(data);
    // const transformedUsers = users.map(user => user.transform());
    return users;
  } catch (error) {
    throw error;
  }
};


/**
 * Create new user
 * @public
 */
exports.create = async ({
  query, body, params, user, access,
}) => {
  try {
    const Collection = mongooseModel.getCollection(params.collection);
    const data = mongooseModel.insertMakerAndValidator({
      access, data: body, user, reqParams: { ...query, ...params },
    });
    const collectionInstance = new Collection(data);
    const dataSaved = await collectionInstance.save();
    return dataSaved;
  } catch (error) {
    throw error;
  }
  // catch (error) {
  //   throw User.checkDuplicateEmail(error);
  // }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (Collection, user, newUserData) => {
  try {
    const newUser = new Collection(newUserData);
    const ommitRole = user.role !== 'admin' ? 'role' : '';
    const newUserObject = omit(newUser.toObject(), '_id', ommitRole);

    await user.update(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    return savedUser.transform();
  } catch (error) {
    throw error;
  }
  // catch (error) {
  //   throw User.checkDuplicateEmail(error);
  // }
};

/**
 * Update existing user
 * @public
 */
exports.update = async ({
  query, body, params, user, access,
}) => {
  try {
    const Collection = mongooseModel.getCollection(params.collection);
    const data = mongooseModel.setterMakerAndValidator({ access, user, reqParams: { ...query, ...params, ...body } });
    const users = await Collection.update(data.filter, data.setter, { multi: true });
    return users;
  } catch (error) {
    throw error;
  }
  // catch (error) {
  //   throw User.checkDuplicateEmail(error);
  // }
};

/**
 * Get user list
 * @public
 */
exports.list = async ({
  query, body, params, user, access,
}) => {
  console.log('query, body, params, user,', query, body, params, user, access);
  try {
    const Collection = mongooseModel.getCollection(params.collection);
    const data = mongooseModel.queryMakerAndValidator({ access, user, reqParams: { ...query, ...params, ...body } });
    const users = await Collection.get(data);
    // const transformedUsers = users.map(user => user.transform());
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = async ({
  query, body, params, user, access,
}) => {
  console.log('query, body, params, user,', query, body, params, user, access);
  try {
    const Collection = mongooseModel.getCollection(params.collection);
    const data = mongooseModel.queryMakerAndValidator({ access, user, reqParams: { ...query, ...params, ...body } });
    const users = await Collection.remove(data.filter);
    // const transformedUsers = users.map(user => user.transform());
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * Dispatch action
 * @public
 */
exports.actionHandler = async (req, resp, next) => {
  try {
    const users = await API_STORE.dispatch(req.params.action, req, resp);
    return users;
  } catch (error) {
    throw error;
  }
};
