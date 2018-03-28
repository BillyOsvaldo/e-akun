const { populate } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors')

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
  const users = context.app.service('users')
  const ObjectId = context.app.get('mongooseClient').Types.ObjectId

  const fillEndDateToCurrent = async () => {
    const filter = { organizationstructure: ObjectId(context.data.organizationstructure) }
    const sort = { startDate: -1 }

    const docs = await OrganizationStructuresUsers.find(filter).sort(sort)

    if(docs.length) {
      const firstDoc = docs[0]
      var startDateObj = new Date(context.data.startDate)
      startDateObj.setDate(startDateObj.getDate() - 1) // current date - 1
      await organizationStructuresUsers.patch(firstDoc._id, { endDate: startDateObj })
      await users.patch(firstDoc.user, { position: null })
    }
  }

  const fillEndDateToSelf = async () => {
    const filter = { user: ObjectId(context.data.user) }
    const sort = { startDate: -1 }

    const docs = await OrganizationStructuresUsers.find(filter).sort(sort)
    if(docs.length) {
      const firstDoc = docs[0]
      var startDateObj = new Date(context.data.startDate)
      startDateObj.setDate(startDateObj.getDate() - 1) // current date - 1
      await organizationStructuresUsers.patch(firstDoc._id, { endDate: startDateObj })
    }
  }

  await fillEndDateToCurrent()
  await fillEndDateToSelf()
}

organizationstructuresusersHook.updateRole = async (context) => {
  if(!context.data.user) return

  const params = {
    query: {
      user: context.data.user,
      $sort: { startDate: -1 }
    }
  }

  const docOrganizationStructuresUsers = await context.app.service('organizationstructuresusers').find(params)
  const idOrganizationStructureUsers = docOrganizationStructuresUsers.data[0].organizationstructure
  const docOrganizationstructure = await context.app.service('organizationstructures').get(idOrganizationStructureUsers)
  const role = docOrganizationstructure.role
  const user = context.data.user
  const users = context.app.service('users')
  await users.patch(user, { role: role })
  context.data.idOrganizationStructureUsers = idOrganizationStructureUsers
}

organizationstructuresusersHook.updatePosition = async (context) => {
  if(!context.data.user) return

  const user = context.data.user
  const users = context.app.service('users')
  await users.patch(user, { position: context.data.idOrganizationStructureUsers })
  delete context.data.idOrganizationStructureUsers
}

organizationstructuresusersHook.publish = async (context) => {
  if(!context.id.startsWith('publish_')) return

  const id = context.id.replace('publish_', '')
  const organizationStructuresUsersDraft = context.app.service('organizationstructuresusersdraft')
  const organizationStructuresUsers = context.app.service('organizationstructuresusersmanagement')

  const docOrganizationStructuresUsersDraft = await organizationStructuresUsersDraft.get(id)
  if(!docOrganizationStructuresUsersDraft) {
    throw new errors.BadRequest('Doc not found')
  }

  await organizationStructuresUsers.create(docOrganizationStructuresUsersDraft)
  await organizationStructuresUsersDraft.remove(docOrganizationStructuresUsersDraft._id)
  context.result = docOrganizationStructuresUsersDraft
}

module.exports = organizationstructuresusersHook
