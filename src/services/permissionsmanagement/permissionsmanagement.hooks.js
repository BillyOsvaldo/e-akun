const permissionsManagementHook = require('../../hooks/permissionsmanagement_service')

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
    find: [ permissionsManagementHook.populate ],
    get: [ permissionsManagementHook.populate ],
    create: [ permissionsManagementHook.populate ],
    update: [],
    patch: [ permissionsManagementHook.populate ],
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
