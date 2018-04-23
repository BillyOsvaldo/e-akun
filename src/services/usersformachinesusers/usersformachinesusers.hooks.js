const { populate } = require('feathers-hooks-common');

const populateSchema = {
  include: [
    {
      service: 'organizations',
      nameAs: 'organization',
      parentField: 'organization',
      childField: '_id'
    },
    {
      service: 'profiles',
      nameAs: 'profile',
      parentField: 'profile',
      childField: '_id'
    }
  ]
}

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
    all: [populate({ schema: populateSchema })],
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
