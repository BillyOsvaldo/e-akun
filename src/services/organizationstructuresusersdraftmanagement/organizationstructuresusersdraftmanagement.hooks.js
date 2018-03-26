const organizationStructuresUsersHooks = require('../../hooks/organizationstructuresusers_service')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ organizationStructuresUsersHooks.fillEndDate ],
    update: [],
    patch: [],
    remove: [ organizationStructuresUsersHooks.publish ]
  },

  after: {
    all: [],
    find: [ organizationStructuresUsersHooks.populate ],
    get: [ organizationStructuresUsersHooks.populate ],
    create: [ organizationStructuresUsersHooks.populate ],
    update: [],
    patch: [ organizationStructuresUsersHooks.populate ],
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
