const { authenticate } = require('feathers-authentication').hooks
const permissions = require('../../hooks/permissions')
const common = require('feathers-hooks-common')

const generateCode = require('../../hooks/generate_codereg')
const sendEmailCodeReg = require('../../hooks/send_email_codereg')
const orderByCreatedAtDesc = require('../../hooks/order_by_created_at_desc')
const addTimestamp = require('../../hooks/add_timestamp')

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ orderByCreatedAtDesc ],
    get: [],
    create: [ permissions.adminOnly(), generateCode, sendEmailCodeReg ],
    update: [ common.disallow(), sendEmailCodeReg ],
    patch: [ sendEmailCodeReg ],
    remove: [ permissions.adminOnly() ]
  },

  after: {
    all: [ addTimestamp ],
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
