const { populate } = require('feathers-hooks-common');

const menusManagementHook = {}

menusManagementHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'roles',
        nameAs: 'roles',
        parentField: 'roles',
        childField: '_id',
        asArray: true
      },
      {
        service: 'permissions',
        nameAs: 'permissions',
        parentField: 'permissions',
        childField: '_id',
        asArray: true,
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

  await populate({ schema: populateSchema })(context)
}

module.exports = menusManagementHook
