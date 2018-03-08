const { populate } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors')

const permissionsManagementHook = {}

permissionsManagementHook.populate = async (context) => {
  var populateSchema = {
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

  await populate({ schema: populateSchema })(context)
}

permissionsManagementHook.ensureUnique = async context => {
  const filter = {
    app: context.data.app,
    administrator: context.data.administrator
  }

  const Permissions = context.app.service('permissions').Model
  const docsLength = await Permissions.count(filter)
  if(docsLength) {
    throw new errors.BadRequest('Permission duplikat')
  }
}

module.exports = permissionsManagementHook
