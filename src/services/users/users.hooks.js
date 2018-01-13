const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const { fastJoin, populate } = require('feathers-hooks-common');

let x = this
let app = null

const setApp = function (context) {
  x = context
  if (typeof context.params.query.app !== 'undefined') {
    app = context.params.query.app
  }
}

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

const testResolvers = {
  joins: {
    profile: () => async users => {
      users.profile = (await x.app.service('profiles').get(users.profile))
    },
    opd: () => async users => {
      users.opd = (await x.app.service('opds').get(users.opd))
    },
    role: () => async users => {
      users.role = (await x.app.service('roles').get(users.role))
    },
    permissions: () => async users => {
      console.log(x.params)
      console.log(app)
      users.permission = (await x.app.service('permissions')
        .find({
          query: {
            app: x.params.query.app
          }
        }))
    }
  }
};

module.exports = {
  before: {
    all: [setApp],
    find: [ authenticate('jwt') ],
    get: [],
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
    get: [fastJoin(testResolvers)],
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
