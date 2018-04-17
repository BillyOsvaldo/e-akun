const { authenticate } = require('@feathersjs/authentication').hooks
const permissions = require('../../hooks/permissions')
const common = require('feathers-hooks-common')

const orderByOrderAsc = require('../../hooks/order_by_order_asc')
const menusHook = require('../../hooks/menus_service')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ orderByOrderAsc, menusHook.paginationBefore ],
    get: [],
    create: [ permissions.adminOnly(), menusHook.generateOrder ],
    update: [ common.disallow() ],
    patch: [ permissions.adminOnly() ],
    remove: [ permissions.adminOnly() ]
  },

  after: {
    all: [],
    find: [ menusHook.paginationAfter ],
    get: [],
    create: [],
    update: [],
    patch: [],
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
