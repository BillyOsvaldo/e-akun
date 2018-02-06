const { authenticate } = require('feathers-authentication').hooks;
const generateCode = require('../../hooks/generate_codereg')

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ generateCode ],
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
