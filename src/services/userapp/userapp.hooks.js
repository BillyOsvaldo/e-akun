const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const { populate } = require('feathers-hooks-common');
const addTimestamp = require('../../hooks/add_timestamp')
const userappHook = require('../../hooks/userapp_service')

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
]

const populateSchema = {
  include: [
    {
      service: 'profiles',
      nameAs: 'profile',
      parentField: 'profile',
      childField: '_id',
      include: [
        {
          service: 'postcodes',
          nameAs: 'address.postcode',
          parentField: 'address.postcode',
          childField: '_id'
        }
      ]
    },
    {
      service: 'opds',
      nameAs: 'opd',
      parentField: 'opd',
      childField: '_id'
    },
    {
      service: 'roles',
      nameAs: 'role',
      parentField: 'role',
      childField: '_id'
    },
    {
      service: 'permissions',
      nameAs: 'permissions',
      parentField: 'permissions',
      childField: '_id',
      select: (hook) => ({ app: hook.app.get('appid') }),
      include: [
        {
          service: 'apps',
          nameAs: 'app',
          parentField: 'app',
          childField: '_id'
        },
        {
          service: 'administrators',
          nameAs: 'administrator',
          parentField: 'administrator',
          childField: '_id',
        }
      ]
    }
  ]
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ userappHook.checkPns ],
    update: [ authenticate('jwt') ],
    patch: [
      ...restrict,
      commonHooks.when(
        hook => typeof hook.data.password !== 'undefined',
        hashPassword()
      )
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
    find: [ populate({ schema: populateSchema }) ],
    get: [ populate({ schema: populateSchema }) ],
    create: [],
    update: [],
    patch: [ populate({ schema: populateSchema }) ],
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
