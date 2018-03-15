const positionsManagementHooks = require('../../hooks/positionsmanagement_service')

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
    find: [ positionsManagementHooks.populate ],
    get: [ positionsManagementHooks.populate ],
    create: [],
    update: [],
    patch: [ positionsManagementHooks.populate ],
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
