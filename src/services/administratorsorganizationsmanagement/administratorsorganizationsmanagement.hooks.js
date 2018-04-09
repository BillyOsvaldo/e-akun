const usersManagementHook = require('../../hooks/usersmanagement_service')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ usersManagementHook.populate ],
    get: [ usersManagementHook.populate ],
    create: [ usersManagementHook.populate ],
    update: [],
    patch: [ usersManagementHook.populate ],
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
