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
  include:
  {
    service: 'profiles',
    nameAs: 'profiles',
    parentField: '_id',
    childField: 'profile'
  }
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: populate({ schema: populateSchema }),
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
