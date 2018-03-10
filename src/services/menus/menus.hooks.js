const { authenticate } = require('feathers-authentication').hooks;
const orderByOrderAsc = require('../../hooks/order_by_order_asc')
const menusHook = require('../../hooks/menus_service')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ orderByOrderAsc ],
    get: [],
    create: [ menusHook.generateOrder ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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
