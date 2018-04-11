const { authenticate } = require('feathers-authentication').hooks
const permissions = require('../../hooks/permissions')
const common = require('feathers-hooks-common')

const permissionsManagementHook = require('../../hooks/permissionsmanagement_service')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [ permissions.adminOnly(), permissionsManagementHook.ensureUnique ],
    update: [ common.disallow() ],
    patch: [ permissions.adminOnly() ],
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
