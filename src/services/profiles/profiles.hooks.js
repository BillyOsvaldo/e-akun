const { authenticate } = require('@feathersjs/authentication').hooks
const permissions = require('../../hooks/permissions')
const common = require('feathers-hooks-common')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [ common.disallow() ],
    patch: [ permissions.restrict('_id', 'profile') ],
    remove: [ permissions.adminOnly() ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
