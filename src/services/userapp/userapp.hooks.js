const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const { populate } = require('feathers-hooks-common');
const addTimestamp = require('../../hooks/add_timestamp')

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
    all: [ authenticate('jwt') ],
    find: [],
    get: [ ...restrict ],
    create: [],
    update: [],
    patch: [
      ...restrict,
      commonHooks.when(
        hook => typeof hook.data.password !== 'undefined',
        hashPassword()
      )
    ],
    remove: []
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.when(
          hook => (typeof hook.result !== 'undefined' && typeof hook.result.password !== 'undefined'),
          commonHooks.discard('password')
        )
      )
    ],
    find: [ addTimestamp ],
    get: [ populate({ schema: populateSchema }), addTimestamp ],
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
