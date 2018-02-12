const errors = require('@feathersjs/errors')

const userappHook = {}

// if new user is pns, then nip is required
userappHook.checkPns = async (context) => {
  if(context.data.isPns && !context.data.nip) {
    throw new errors.BadRequest('PNS wajib mengisi NIP')
  }

  return context
}

module.exports = userappHook
