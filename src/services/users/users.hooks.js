const { authenticate } = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks')
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const permissions = require('../../hooks/permissions')
const usersHooks = require('../../hooks/users_service')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [ permissions.restrict ],
    create: [ hashPassword() ],
    update: [ hashPassword() ],
    patch: [ hashPassword(), permissions.restrict ],
    remove: [ permissions.restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [ usersHooks.populate ],
    get: [ usersHooks.populate ],
    create: [],
    update: [],
    patch: [ usersHooks.populate ],
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
