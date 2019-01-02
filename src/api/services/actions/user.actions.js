import { each } from 'lodash';

const { fileUpload } = require('../../../config/vars');

module.exports = {
  /**
     * @api {all} v1/dispatch/testing call a common api
     * @apiDescription Call a common api
     * @apiVersion 1.0.0
     * @apiName Common API
     * @apiGroup Common
     * @apiPermission public or private or role based
     *
     * @apiHeader {String} Authorization  User's access token required for public or role based api
     *
     * @apiParam  {String}              any_string     You can send any keys containing string
     * @apiParam  {Number}              any_numbers    You can send any keys containing numbers
     * @apiParam  {Object}              any_object     You can send any keys containing object
     * @apiParam  {Array}               any_array      You can send any keys containing Array
     *
     * @apiSuccess (Done 200) {Object}  response    response object
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users
     * @apiError (Forbidden 403)     Forbidden        You are not allowed to access this API
  */
  testing: {
    public: true,
    roles: ['SUPERADMIN'],
    dispatch: async ({
      params, user, getModel, dispatch,
    }) => {
      const Users = await getModel('User').get({});
      console.log('testing....', Users, params, user, getModel, dispatch);
      return { users: Users };
    },
  },
  /**
     * @api {all} v1/dispatch/upload call a common api
     * @apiDescription Call a common api
     * @apiVersion 1.0.0
     * @apiName Common API
     * @apiGroup Common
     * @apiPermission public or private or role based
     *
     * @apiHeader {String} Authorization  User's access token required for public or role based api
     * @apiHeader {String} content-type   multipart/form-data
     *
     * @apiParam  {file}      FileName     file data with file name field
     *
     * @apiSuccess (Done 200) {Object}  response    response object
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users
     * @apiError (Forbidden 403)     Forbidden        You are not allowed to access this API
  */
  upload: {
    public: true,
    dispatch: async ({
      params, user, getModel, dispatch,
    }) => {
      const Users = await getModel('User').get({});
      console.log('upload....files', params);
      const { files } = params;
      if (files) {
        const allPromises = [];
        each(Object.keys(files), (file) => {
          allPromises.push(new Promise((resolve, reject) => {
            console.log('pwd', __dirname);
            if (!fileUpload.type || fileUpload.type === 'local') {
              files[file].mv(`./uploads/${Date.now()}-${files[file].name}`, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve({ [file]: `${Date.now()}-${files[file].name}` });
                }
              });
            }
          }));
        });
        return Promise.all(allPromises).then((values) => {
          console.log(values);
          return values;
        });
      }
    },
  },
};
