const organizationstructuresManagementHooks = require('../../hooks/organizationstructuresmanagement_service')

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
    find: [ organizationstructuresManagementHooks.populate ],
    get: [ organizationstructuresManagementHooks.populate ],
    create: [],
    update: [],
    patch: [ organizationstructuresManagementHooks.populate ],
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
