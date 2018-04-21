const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('@feathersjs/authentication-local').hooks;
const addTimestamp = require('../../hooks/add_timestamp')
const usersManagementHooks = require('../../hooks/usersmanagement_service')
const permissions = require('../../hooks/permissions')

module.exports = {
  before: {
    all: [],
    find: [ permissions.apiOrJWT ],
    get: [ permissions.restrict() ],
    create: [ usersManagementHooks.checkPns ],
    update: [ authenticate('jwt') ],
    patch: [
      authenticate('jwt')
    ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [
      addTimestamp,
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.when(
          hook => (typeof hook.result !== 'undefined' && typeof hook.result.password !== 'undefined'),
          commonHooks.discard('password')
        )
      )
    ],
    find: [ usersManagementHooks.populate ],
    get: [ usersManagementHooks.populate ],
    create: [],
    update: [],
    patch: [ usersManagementHooks.populate ],
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
