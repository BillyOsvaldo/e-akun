const { populate } = require('feathers-hooks-common');

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

module.exports = permissionsManagementHook
