const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [ authenticate('jwt') ],
    create: [],
    update: [],
    patch: [],
    remove: []
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
