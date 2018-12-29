import configure from './api/services/daffodil.services/configure';
import roles from './config/roles';
import grantList from './config/grantList';
import fields from './api/services/fields';
import hooks from './api/services/hooks';
import methods from './api/services/methods';

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');


// open mongoose connection
mongoose.connect();
configure({
  roles, grantList, fields, hooks, methods,
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
