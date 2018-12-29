import { each } from 'lodash';
import { accessControl } from './accessControl';
import mongooseModel from './mongoose.model';

const configure = ({
  fields, grantList, roles, hooks = {}, methods = {},
}) => {
  console.log('fields, grantList, roles', fields, grantList, roles);
  accessControl.addGrantList(grantList);
  each(Object.keys(fields), (collection) => {
    mongooseModel.addCollection(collection, fields[collection], hooks[collection], methods[collection]);
    accessControl.addFields(fields[collection], collection);
  });
  accessControl.configureAccessControlList();
};


module.exports = configure;
