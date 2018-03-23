const { populate } = require('feathers-hooks-common');

const organizationstructuresusersHook = {}
organizationstructuresusersHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'users',
        nameAs: 'user',
        parentField: 'user',
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

organizationstructuresusersHook.fillEndDate = async (context) => {
  const OrganizationStructuresUsers = context.app.service('organizationstructuresusers').Model
  const organizationStructuresUsers = context.app.service('organizationstructuresusers')
  const ObjectId = context.app.get('mongooseClient').Types.ObjectId

  const filter = { user: ObjectId(context.data.user) }
  const sort = { startDate: -1 }

  const docs = await OrganizationStructuresUsers.find(filter).sort(sort)
  if(docs.length) {
    const firstDoc = docs[0]
    var startDateObj = new Date(context.data.startDate)
    startDateObj.setDate(startDateObj.getDate() - 1) // current date - 1
    organizationStructuresUsers.patch(firstDoc._id, { endDate: startDateObj })
  }
}

organizationstructuresusersHook.updateRole = async (context) => {
  const params = {
    query: {
      user: context.data.user,
      $sort: { startDate: -1 }
    }
  }

  const idOrganizationStructureUsers = (await context.app.service('organizationstructuresusers').find(params)).data[0].organizationstructure
  const docOrganizationstructure = await context.app.service('organizationstructures').get(idOrganizationStructureUsers)
  const role = docOrganizationstructure.role
  const user = context.data.user
  const users = context.app.service('users')
  await users.patch(user, { role: role })
  context.data.idOrganizationStructureUsers = idOrganizationStructureUsers
}

organizationstructuresusersHook.updatePosition = async (context) => {
  const user = context.data.user
  const users = context.app.service('users')
  console.log('user', user)
  console.log('{ position: context.data.idOrganizationStructureUsers }', { position: context.data.idOrganizationStructureUsers })
  await users.patch(user, { position: context.data.idOrganizationStructureUsers })
  delete context.data.idOrganizationStructureUsers
}

module.exports = organizationstructuresusersHook
