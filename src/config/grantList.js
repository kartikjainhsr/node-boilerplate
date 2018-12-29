const ROLES = require('./roles');


const grantList =
    {
      [ROLES.SUPERADMIN]: {
        User: {
          read_any: {
            filter: {},
            allowedFields: ['*'],
            deniedFields: ['password'],
          },
          read_own: {
            filter: { _id: '=currentUser' },
            allowedFields: ['*'],
            deniedFields: ['services', 'password'],
          },
        },
        Customer: {
          read_any: {
            filter: { },
            allowedFields: ['*'],
            deniedFields: ['email'],
          },
          read_own: {
            filter: { _id: '=currentUser.customer' },
            allowedFields: ['*'],
            deniedFields: ['email'],
          },
          create_own: {
            setter: { user: '=currentUser._id' },
            allowedFields: ['*'],
            deniedFields: ['user'],
          },
          remove_any: {
            filter: {},
          },
          remove_own: {
            filter: { user: '=currentUser._id' },
            allowedFields: ['*'],
          },
          update_any: {
            filter: {},
            allowedFields: ['*'],
            deniedFields: ['address.country.name'],
            $pop: {
              allowedFields: ['*'],
            },
            $pull: {
              allowedFields: ['location', 'grades'],
            },
            $unset: {
              allowedFields: ['address.city'],
            },
          },
          update_own: {
            filter: { user: '=currentUser._id' },
            allowedFields: ['*'],
            deniedFields: ['address.country.name'],
            $pop: {
              allowedFields: ['*'],
            },
            $pull: {
              allowedFields: ['location', 'grades'],
            },
            $unset: {
              allowedFields: ['address.city'],
            },
          },
        },
      },
      // [ROLES.CUSTOMER]: {
      //   User: {
      //     read_any: {
      //       filter: { _id: { $ne: '=currentUser' } },
      //       allowedFields: ['*'],
      //       deniedFields: ['password', 'role'],
      //     },
      //     read_own: {
      //       filter: {},
      //       allowedFields: ['*'],
      //       deniedFields: ['password', 'role', 'services'],
      //     },
      //   },
      // },
      // [ROLES.DEPARTMENT]: {
      //   User: {
      //     read_any: {
      //       filter: { _id: { $ne: '=currentUser' } },
      //       allowedFields: ['*'],
      //       deniedFields: ['password', 'role'],
      //     },
      //     read_own: {
      //       filter: {},
      //       allowedFields: ['*'],
      //       deniedFields: ['password', 'role'],
      //     },
      //   },
      // },
      // [ROLES.OFFICER]: {
      //   User: {
      //     read_any: {
      //       filter: { _id: { $ne: '=currentUser' } },
      //       allowedFields: ['*'],
      //       deniedFields: ['password', 'role'],
      //     },
      //     read_own: {
      //       filter: {},
      //       allowedFields: ['*'],
      //       deniedFields: ['password', 'role'],
      //     },
      //   },
      //   Customer: {
      //     read_any: {
      //       filter: { },
      //       allowedFields: ['*'],
      //       deniedFields: ['email'],
      //     },
      //   },
      // },
    };

module.exports = grantList;

