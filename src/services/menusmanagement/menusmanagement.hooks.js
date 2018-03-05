const menusManagementHook = require('../../hooks/menusmanagement_service')

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
    find: [ menusManagementHook.populate ],
    get: [ menusManagementHook.populate ],
    create: [],
    update: [],
    patch: [ menusManagementHook.populate ],
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
