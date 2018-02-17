const { populate } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors')

const userappHook = {}

// if new user is pns, then nip is required
userappHook.checkPns = async (context) => {
  if(context.data.isPns && !context.data.nip) {
    throw new errors.BadRequest('PNS wajib mengisi NIP')
  }

  return context
}

userappHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'opds',
        nameAs: 'opd',
        parentField: 'opd',
        childField: '_id'
      },
      {
        service: 'roles',
        nameAs: 'role',
        parentField: 'role',
        childField: '_id'
      },
      {
        service: 'permissions',
        nameAs: 'permissions',
        parentField: 'permissions',
        childField: '_id',
        select: (hook) => ({ app: hook.app.get('appid') }),
        include: [
          {
            service: 'apps',
            nameAs: 'app',
            parentField: 'app',
            childField: '_id'
          },
          {
            service: 'administrators',
            nameAs: 'administrator',
            parentField: 'administrator',
            childField: '_id',
          }
        ]
      }
    ]
  }

  populateSchema.include.push({
    service: 'profiles',
    nameAs: 'profile',
    parentField: 'profile',
    childField: '_id',
    include: [
      {
        service: 'postcodes',
        nameAs: 'address.postcode',
        parentField: 'address.postcode',
        childField: '_id'
      }
    ]
  })

  await populate({ schema: populateSchema })(context)
}

module.exports = userappHook
