const { authenticate } = require('feathers-authentication').hooks;
const orderByOrderAsc = require('../../hooks/order_by_order_asc')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ orderByOrderAsc ],
    get: [],
    create: [],
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
