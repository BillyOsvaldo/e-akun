const organizationStructuresUsersHooks = require('../../hooks/organizationstructuresusers_service')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ organizationStructuresUsersHooks.fillEndDate ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ organizationStructuresUsersHooks.populate ],
    get: [ organizationStructuresUsersHooks.populate ],
    create: [ organizationStructuresUsersHooks.updateRole, organizationStructuresUsersHooks.updatePosition, organizationStructuresUsersHooks.populate ],
    update: [ organizationStructuresUsersHooks.updateRole,  organizationStructuresUsersHooks.updatePosition ],
    patch: [ organizationStructuresUsersHooks.updateRole, organizationStructuresUsersHooks.updatePosition, organizationStructuresUsersHooks.populate ],
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
