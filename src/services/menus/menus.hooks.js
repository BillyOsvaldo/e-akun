const { authenticate } = require('feathers-authentication').hooks;
const orderByOrderAsc = require('../../hooks/order_by_order_asc')
const menusHook = require('../../hooks/menus_service')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ orderByOrderAsc, menusHook.paginationBefore ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
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
