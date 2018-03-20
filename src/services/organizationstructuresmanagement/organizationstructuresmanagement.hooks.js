const organizationstructuresManagementHooks = require('../../hooks/organizationstructuresmanagement_service')

module.exports = {
  before: {
    all: [],
    find: [
      organizationstructuresManagementHooks.orderByOrderAsc
    ],
    get: [],
    create: [
      organizationstructuresManagementHooks.setParentData,
      organizationstructuresManagementHooks.decideSelfOrder
    ],
    update: [],
    patch: [
      organizationstructuresManagementHooks.setParentData,
      organizationstructuresManagementHooks.removeChildrenArrOfParent,
      organizationstructuresManagementHooks.decideSelfOrder
    ],
    remove: []
  },

  after: {
    all: [],
    find: [ organizationstructuresManagementHooks.populate ],
    get: [ organizationstructuresManagementHooks.populate ],
    create: [
      organizationstructuresManagementHooks.pushToParent,
      organizationstructuresManagementHooks.populate
    ],
    update: [],
    patch: [
      organizationstructuresManagementHooks.pushToParent,
      organizationstructuresManagementHooks.decideDescendantsOrder,
      organizationstructuresManagementHooks.populate
    ],
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
