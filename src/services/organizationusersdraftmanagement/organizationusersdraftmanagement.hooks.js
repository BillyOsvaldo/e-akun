const organizationUsersHooks = require('../../hooks/organizationusers_service')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ organizationUsersHooks.fillEndDate ],
    update: [],
    patch: [],
    remove: [ organizationUsersHooks.publish ]
  },

  after: {
    all: [],
    find: [ organizationUsersHooks.populate ],
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
