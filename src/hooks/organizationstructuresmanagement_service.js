const { populate } = require('feathers-hooks-common');

const organizationstructuresHook = {}
organizationstructuresHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'structures',
        nameAs: 'structure',
        parentField: 'structure',
        childField: '_id'
      },
      {
        service: 'organizations',
        nameAs: 'organization',
        parentField: 'organization',
        childField: '_id',
        include: [
          {
            service: 'postcodes',
            nameAs: 'address.postcode',
            parentField: 'address.postcode',
            childField: '_id'
          }
        ]
      },
      {
        service: 'structurepositions',
        nameAs: 'structureposition',
        parentField: 'structureposition',
        childField: '_id'
      },
      {
        service: 'roles',
        nameAs: 'role',
        parentField: 'role',
        childField: '_id'
      }
    ]
  }

  await populate({ schema: populateSchema })(context)
}

module.exports = organizationstructuresHook
