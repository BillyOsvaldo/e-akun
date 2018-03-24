const { populate } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors')

const organizationusersHook = {}
organizationusersHook.populate = async (context) => {
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
        service: 'organizationstructures',
        nameAs: 'parent',
        parentField: 'parent',
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
  const OrganizationUsers = context.app.service('organizationusers').Model
  const organizationUsers = context.app.service('organizationusers')
  const ObjectId = context.app.get('mongooseClient').Types.ObjectId

  const filter = { user: ObjectId(context.data.user) }
  const sort = { startDate: -1 }

  const docs = await OrganizationUsers.find(filter).sort(sort)
  if(docs.length) {
    const firstDoc = docs[0]
    var startDateObj = new Date(context.data.startDate)
    startDateObj.setDate(startDateObj.getDate() - 1) // current date - 1
    organizationUsers.patch(firstDoc._id, { endDate: startDateObj })
  }
}

organizationusersHook.updateOrganization = async (context) => {
  const params = {
    query: {
      user: context.data.user,
      $sort: { startDate: -1 }
    }
  }

  const docOrganizationUsers = (await context.app.service('organizationusers').find(params)).data[0]
  const newOrganization = docOrganizationUsers.organization
  const user = context.data.user
  const users = context.app.service('users')
  await users.patch(user, { organization: newOrganization })
  context.data.newOrganizationUsers = docOrganizationUsers._id
}

organizationusersHook.updateOrganizationUsers = async (context) => {
  const user = context.data.user
  const users = context.app.service('users')
  await users.patch(user, { organizationuser: context.data.newOrganizationUsers })
}

organizationusersHook.publish = async (context) => {
  if(!context.id.startsWith('publish_')) return

  const id = context.id.replace('publish_', '')
  const organizationUsersDraft = context.app.service('organizationusersdraft')
  const organizationUsers = context.app.service('organizationusersmanagement')

  const docOrganizationUsersDraft = await organizationUsersDraft.get(id)
  if(!docOrganizationUsersDraft) {
    throw new errors.BadRequest('Doc not found')
  }

  await organizationUsers.create(docOrganizationUsersDraft)
  await organizationUsersDraft.remove(docOrganizationUsersDraft._id)
  context.result = docOrganizationUsersDraft
}

module.exports = organizationusersHook
