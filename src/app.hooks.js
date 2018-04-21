// Application hooks that run for every service
const logger = require('./hooks/logger');
const { authenticate } = require('@feathersjs/authentication').hooks
const noPaginateHandler = require('./hooks/no_paginate_handler')

module.exports = {
  before: {
    all: [],
    find: [ noPaginateHandler ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ logger() ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
