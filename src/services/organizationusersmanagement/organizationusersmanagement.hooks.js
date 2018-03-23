const organizationUsersHooks = require('../../hooks/organizationusers_service')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ organizationUsersHooks.fillEndDate ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ organizationUsersHooks.populate ],
    get: [ organizationUsersHooks.populate ],
    create: [ organizationUsersHooks.updateOrganization, organizationUsersHooks.updateParent, organizationUsersHooks.populate ],
    update: [ organizationUsersHooks.updateOrganization, organizationUsersHooks.updateParent ],
    patch: [ organizationUsersHooks.updateOrganization, organizationUsersHooks.updateParent, organizationUsersHooks.populate ],
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
