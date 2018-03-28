const { populate } = require('feathers-hooks-common');
const errors = require('@feathersjs/errors')

const organizationusersHook = {}
organizationusersHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'organizationstructuresusers',
        nameAs: 'inside',
        parentField: 'inside',
        childField: '_id',
        include: [
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
              }
            ]
          }
        ]
      },
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

  /*
    publishOrganizationStructuresUsers()
      format:
        publish_{organizationusers._id}_{organizationstructuresusers._id}

      logic:
        if organizationstructuresusers._id is exist:
          publish organizationstructuresusers._id
  */

  const publishOrganizationStructuresUsers = async (organizationStructuresUsersId) => {
    const organizationStructuresUsersDraft = context.app.service('organizationstructuresusersdraftmanagement')
    /*const organizationStructuresUsers = context.app.service('organizationstructuresusersmanagement')

    const docOrganizationStructuresUsers = await organizationStructuresUsersDraft.get(organizationStructuresUsersId)

    await organizationStructuresUsers.create(docOrganizationStructuresUsers)*/
    await organizationStructuresUsersDraft.remove('publish_' + organizationStructuresUsersId) 
  }

  const mergedId = context.id.replace('publish_', '').split('_')

  const isOrganizationStructuresUsersIdExist = (mergedId.length > 1)
  if(isOrganizationStructuresUsersIdExist) {
    const organizationStructuresUsersId = mergedId[1]
    await publishOrganizationStructuresUsers(organizationStructuresUsersId)
  }

  const organizationUsersDraftid = mergedId[0]
  const organizationUsersDraft = context.app.service('organizationusersdraft')
  const organizationUsers = context.app.service('organizationusers')
  const organizationUsersManagement = context.app.service('organizationusersmanagement')

  const docOrganizationUsersDraft = await organizationUsersDraft.get(organizationUsersDraftid)
  if(!docOrganizationUsersDraft) {
    throw new errors.BadRequest('Doc not found')
  }

  /*
    find organizationusersmanagement where user=currentUserId AND organization=currentOrganizationId, endDate=null
    if not found
      await organizationUsers.create(docOrganizationUsersDraft)
    endif
  */

  const whereOrganizationUsers = {
    user: docOrganizationUsersDraft.user,
    organization: docOrganizationUsersDraft.organization,
    endDate: null
  }

  const docs = await organizationUsers.find(whereOrganizationUsers)
  const isOrganizationUsersExist = Boolean(docs.total)
  if(!isOrganizationUsersExist) {
    await organizationUsersManagement.create(docOrganizationUsersDraft)
  }

  await organizationUsersDraft.remove(docOrganizationUsersDraft._id)
  context.result = docOrganizationUsersDraft
}

module.exports = organizationusersHook
