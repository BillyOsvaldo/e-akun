const organizationUsersHooks = require('../../hooks/organizationusers_service')

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
    find: [ organizationUsersHooks.populate, organizationUsersHooks.setOrganizationStructuresUsers ],
    get: [ organizationUsersHooks.populate ],
    create: [ organizationUsersHooks.populate ],
    update: [],
    patch: [ organizationUsersHooks.populate ],
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
