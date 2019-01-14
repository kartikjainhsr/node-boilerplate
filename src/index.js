import configure from './api/configure/configure';
import roles from './config/roles';
import grantList from './config/grantList';
import fields from './api/services/fields';
import hooks from './api/services/hooks';
import methods from './api/services/methods';
import actions from './api/actions';

const path = require('path');

global.appRoot = path.resolve(__dirname);

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');
// open mongoose connection
mongoose.connect();
configure({
  roles, grantList, fields, hooks, methods, actions,
});
// listen to requests
app.listen(port, () => {
  console.info(`server started on port ${port} (${env})`);
});

/**
* Exports express
* @public
*/
module.exports = app;
