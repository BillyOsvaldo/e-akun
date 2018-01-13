const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { hashPassword } = require('feathers-authentication-local').hooks;
const { fastJoin } = require('feathers-hooks-common');
const { profiles } = require('./../services');

const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

const profileResolvers = {
  joins: {
    data_profile: $select => async user => {
      console.log(profiles)
      user.data_profile = (await this.app.service('profiles').get(user.profile))
    }
  }
}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ fastJoin(profileResolvers) ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
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
