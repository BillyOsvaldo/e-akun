const { populate } = require('feathers-hooks-common');

const organizationusersHook = {}
organizationusersHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'users',
        nameAs: 'userId',
        parentField: 'userId',
        childField: '_id',
        asArray: false,
        include: [
          {
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
          }
        ]
      },
      {
        service: 'organizationstructures',
        nameAs: 'organizationstructure',
        parentField: 'organizationstructure',
        childField: '_id',
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
            service: 'roles',
            nameAs: 'role',
            parentField: 'role',
            childField: '_id'
          }
        ]
      }
    ]
  }

  await populate({ schema: populateSchema })(context)
}

organizationusersHook.fillEndDate = async (context) => {
  const OrganizationStructuresUsers = context.app.service('organizationstructuresusers').Model
  const organizationStructuresUsers = context.app.service('organizationstructuresusers')
  const ObjectId = context.app.get('mongooseClient').Types.ObjectId

  const filter = { userId: ObjectId(context.data.userId) }
  const sort = { startDate: -1 }

  const docs = await OrganizationStructuresUsers.find(filter).sort(sort)
  if(docs.length) {
    const firstDoc = docs[0]
    var startDateObj = new Date(context.data.startDate)
    startDateObj.setDate(startDateObj.getDate() - 1) // current date - 1
    organizationStructuresUsers.patch(firstDoc._id, { endDate: startDateObj })
  }
}

module.exports = organizationusersHook
