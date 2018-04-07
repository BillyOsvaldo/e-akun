const coderegsHook = require('../../hooks/coderegs_service')

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
    find: [ coderegsHook.populate ],
    get: [ coderegsHook.populate ],
    create: [ coderegsHook.populate ],
    update: [ coderegsHook.populate ],
    patch: [ coderegsHook.populate ],
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
