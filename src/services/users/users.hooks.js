const { authenticate } = require('feathers-authentication').hooks
const permissions = require('../../hooks/permissions')
const common = require('feathers-hooks-common')

const hooks = require('feathers-hooks')
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ hashPassword() ],
    update: [ common.disallow(), hashPassword() ],
    patch: [ permissions.restrict(), hashPassword() ],
    remove: [ common.disallow() ]
  },

  after: {
    all: [
      common.when(
        hook => hook.params.provider,
        common.discard('password')
      )
    ],
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
