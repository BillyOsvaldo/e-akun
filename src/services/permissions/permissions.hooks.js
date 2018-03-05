const { authenticate } = require('feathers-authentication').hooks;
const permissionsHooks = require('../../hooks/permissions_service')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ permissionsHooks.populate ],
    get: [ permissionsHooks.populate ],
    create: [],
    update: [],
    patch: [ permissionsHooks.populate ],
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
