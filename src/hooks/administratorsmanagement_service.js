const { populate } = require('feathers-hooks-common');

const administratorsselectHook = {}

administratorsselectHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'permissions',
        nameAs: 'permissions',
        parentField: 'permissions',
        childField: '_id',
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

module.exports = administratorsselectHook
