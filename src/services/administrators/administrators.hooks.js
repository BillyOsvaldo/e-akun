const { authenticate } = require('feathers-authentication').hooks
const permissions = require('../../hooks/permissions')
const common = require('feathers-hooks-common')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ permissions.adminOnly() ],
    update: [ common.disallow() ],
    patch: [ permissions.adminOnly() ],
    remove: [ common.disallow() ]
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
