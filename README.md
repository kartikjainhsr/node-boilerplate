# Node.js - Express, MongoDB, Passport REST API and Generalization of CRUD API Boilerplate

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![Build Status](https://travis-ci.org/ridhamtarpara/express-es8-rest-boilerplate.svg?branch=master)](https://travis-ci.org/ridhamtarpara/express-es8-rest-boilerplate) [![Coverage Status](https://coveralls.io/repos/github/ridhamtarpara/express-es8-rest-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/ridhamtarpara/express-es8-rest-boilerplate?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/ridhamtarpara/express-es8-rest-boilerplate.svg)](https://greenkeeper.io/)


## Features
 - Generalization of CRUD API (No need to define CRUD api for every collection just define schema and permissions)
 - File upload and download to filesystem or database
 - Uses [yarn](https://yarnpkg.com)
 - No transpilers, just vanilla javascript with ES2017 latest features like Async/Await
 - Express + MongoDB ([Mongoose](http://mongoosejs.com/))
 - CORS enabled and uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Load environment variables from .env files with [dotenv](https://github.com/rolodato/dotenv-safe)
 - Consistent coding styles with [editorconfig](http://editorconfig.org)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Linting with [eslint](http://eslint.org)
 - Code coverage with [istanbul](https://istanbul.js.org) and [coveralls](https://coveralls.io)
 - Git hooks with [husky](https://github.com/typicode/husky)
 - Logging with [morgan](https://github.com/expressjs/morgan)
 - Authentication and Authorization with [passport](http://passportjs.org)
 - Rate limiting with [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
 - API documentation generation with [apidoc](http://apidocjs.com)

## Prerequisites
 - [Node v7.6+](https://nodejs.org/en/download/current/)
 - [Yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

1. Clone the repo and make it yours:

```bash
git clone https://github.com/rameshbansal/node-boilerplate.git node-api
cd node-api
rm -rf .git
```

2. Install dependencies:

```bash
npm install
```

3. Set environment variables:

```bash
cp .env.example .env
```

## Running Locally

```bash
yarn dev
```

## Running in Production

```bash
yarn start
```

## Basic CRUD operations with roles and permissions

Developer just have to create an roles config file with permissions and by defining the mongo schema of collection he will get basic CRUD API 

### Permission file 

```
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
      [ROLES.CUSTOMER]: {
        User: {
          read_any: {
            filter: { _id: { $ne: '=currentUser' } },
            allowedFields: ['*'],
            deniedFields: ['password', 'role'],
          },
          read_own: {
            filter: {},
            allowedFields: ['*'],
            deniedFields: ['password', 'role', 'services'],
          },
        },
      }
    };

module.exports = grantList;
```
To call basic CRUD api please check api docs

## File upload and download to filesystem or db

Developer just have to declare config for file upload in vars file 

```
fileUpload: {
    type: 'local', // local or S3 or db
    buckets: {
      public: { permissions: { write: 'ANY', read: 'ANY' } },
      app: { permissions: { write: ['SUPERADMIN'], read: ['SUPERADMIN', 'CUSTOMER'] } },
      authBucket: { permissions: { write: ['CUSTOMER'], read: ['SUPERADMIN', 'CUSTOMER'] } },
    },

  },
```

Roles and permission will also work file upload and download


## Lint

```bash
# lint code with ESLint
yarn lint

# try to fix ESLint errors
yarn lint:fix

# lint and watch for changes
yarn lint:watch
```

## Logs

```bash
# show logs in production
pm2 logs
```

## Documentation

```bash
# generate and open api documentation
yarn docs
```

## Rate Limit Configuration
Change configuration in `.env` file
