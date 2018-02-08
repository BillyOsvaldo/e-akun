const { authenticate } = require('feathers-authentication').hooks;
const generateCode = require('../../hooks/generate_codereg')
const sendEmailCodeReg = require('../../hooks/send_email_codereg')
const orderByCreatedAtDesc = require('../../hooks/order_by_created_at_desc')
const addTimestamp = require('../../hooks/add_timestamp')

module.exports = {
  before: {
    all: [],
    find: [ orderByCreatedAtDesc ],
    get: [],
    create: [ generateCode, sendEmailCodeReg ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [ addTimestamp ],
    get: [ addTimestamp ],
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
