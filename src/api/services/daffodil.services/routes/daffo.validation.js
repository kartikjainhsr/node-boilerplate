const Joi = require('joi');
// const User = require('./user.model');


module.exports = {

  // GET /v1/daffo/:collection/count
  count: {
    params: {
      collection: Joi.string().required(),
    },
    body: {
      filter: Joi.object(),
    },
  },
  get: {
    params: {
      collection: Joi.string().required(),
    },
    body: {
      filter: Joi.object(),
      fields: Joi.object(),
      perPage: Joi.number().min(1).max(100).required(),
      page: Joi.number().min(1),
    },

  },
  update: {
    params: {
      collection: Joi.string().required(),
    },
    body: {
      filter: Joi.object(),
      setter: Joi.object().required(),
    },
  },
  deleteDocument: {
    params: {
      collection: Joi.string().required(),
    },
    body: {
      filter: Joi.object().required(),
    },
  },
  getFile: {
    params: {
      bucket: Joi.string().required(),
      name: Joi.string().required(),
    },
  },

//   // POST /v1/users
//   createUser: {
//     body: {
//       email: Joi.string().email().required(),
//       password: Joi.string().min(6).max(128).required(),
//       name: Joi.string().max(128),
//       role: Joi.string().valid(User.roles),
//     },
//   },

//   // PUT /v1/users/:userId
//   replaceUser: {
//     body: {
//       email: Joi.string().email().required(),
//       password: Joi.string().min(6).max(128).required(),
//       name: Joi.string().max(128),
//       role: Joi.string().valid(User.roles),
//     },
//     params: {
//       userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
//     },
//   },

//   // PATCH /v1/users/:userId
//   updateUser: {
//     body: {
//       email: Joi.string().email(),
//       password: Joi.string().min(6).max(128),
//       name: Joi.string().max(128),
//       role: Joi.string().valid(User.roles),
//     },
//     params: {
//       userId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
//     },
//   },
};
