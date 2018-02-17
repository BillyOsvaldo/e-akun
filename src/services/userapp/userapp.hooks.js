const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const addTimestamp = require('../../hooks/add_timestamp')
const userappHook = require('../../hooks/userapp_service')
const permissions = require('../../hooks/permissions')

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
]

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    //find: [ authenticate('jwt'), userappHook.populate ],
    get: [ ...restrict ],
    create: [ userappHook.checkPns ],
    update: [ authenticate('jwt') ],
    patch: [
      authenticate('jwt'),
      commonHooks.when(
        hook => typeof hook.data.password !== 'undefined',
        hashPassword()
      ),
      permissions.restrict
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
    find: [ userappHook.populate ],
    get: [ userappHook.populate ],
    create: [],
    update: [],
    patch: [ userappHook.populate ],
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
