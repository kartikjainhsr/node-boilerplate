import { each } from 'lodash';
import fs from 'fs';

const { fileUpload } = require('../../../config/vars');

module.exports = {
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
     * @apiParam  {string}    public       If file can be accessed without auth
     * @apiParam  [{string}]  roles        For public false case and this roles person will only be able to access this file
     *
     * @apiSuccess (Done 200) {Object}  response    response object
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users
     * @apiError (Forbidden 403)     Forbidden        You are not allowed to access this API
  */
  upload: {
    public: false,
    dispatch: async ({
      params, user, getModel, dispatch,
    }) => {
      console.log('upload....files', params);
      const { files } = params;
      if (files) {
        const allPromises = [];
        if (!fileUpload.type || fileUpload.type === 'local') {
          const subfolderPath = params.public ? 'public' : 'private';
          let accessCode = '';
          if (params.roles) {
            accessCode = `./uploads/${params.roles.sort().join('-').toLowerCase()}`;
          }
          return new Promise((presolve, preject) => {
            console.log('1111');
            fs.exists(accessCode, (exists) => {
              console.log('exists', exists);
              if (!exists) {
                fs.mkdirSync(accessCode);
              }
              each(Object.keys(files), (file) => {
                allPromises.push(new Promise((resolve, reject) => {
                  console.log('pwd', __dirname);
                  files[file].mv(`./uploads/${subfolderPath}/${accessCode}/${Date.now()}-${files[file].name}`, (err) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve({ [file]: `${Date.now()}-${files[file].name}` });
                    }
                  });
                }));
              });
              presolve(true);
            });
          }).then(_ => Promise.all(allPromises).then((values) => {
            console.log(values);
            return values;
          }));
        }
        // else if (fileUpload.type == 'db') {

        // }
      }
    },
  },
};
