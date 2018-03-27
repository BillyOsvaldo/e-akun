const organizationUsersHooks = require('../../hooks/organizationusers_service')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [ organizationUsersHooks.publish ]
  },

  after: {
    all: [],
    find: [],
    get: [ organizationUsersHooks.populate ],
    create: [],
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
