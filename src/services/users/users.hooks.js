const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const { populate } = require('feathers-hooks-common');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

const populateSchema = {
  include: [
    {
      service: 'profiles',
      nameAs: 'profile',
      parentField: 'profile',
      childField: '_id'
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
      select: (hook) => ({ app: hook.params.query.app }),
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
    all: [setApp],
    find: [ authenticate('jwt') ],
    get: [ ...restrict ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [
      commonHooks.when(
        hook => hook.params.query.app,
        populate({ schema: populateSchema })
      )
    ],
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
