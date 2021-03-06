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
    organizationUsers.patch(firstDoc._id, { endDate: startDateObj }, context.params)
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
  const users = context.app.service('usersmanagement')
  await users.patch(user, { organization: newOrganization }, context.params)
  context.data.newOrganizationUsers = docOrganizationUsers._id
}

organizationusersHook.updateOrganizationUsers = async (context) => {
  const user = context.data.user
  const users = context.app.service('usersmanagement')
  await users.patch(user, { organizationuser: context.data.newOrganizationUsers }, context.params)
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

  const mergedId = context.id.replace('publish_', '').split('_')

  const organizationUsersDraftid = mergedId[0]
  const organizationUsersDraft = context.app.service('organizationusersdraft')
  const organizationUsers = context.app.service('organizationusers')
  const organizationUsersManagement = context.app.service('organizationusersmanagement')
  const organizationStructuresUsersDraft = context.app.service('organizationstructuresusersdraftmanagement')
  const organizationStructuresUsers = context.app.service('organizationstructuresusersmanagement')

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
    query: {
      user: docOrganizationUsersDraft.user,
      organization: docOrganizationUsersDraft.organization,
      endDate: null
    }
  }

  const docs = await organizationUsers.find(whereOrganizationUsers)
  const isOrganizationUsersExist = Boolean(docs.total)
  var organizationUsersId
  if(!isOrganizationUsersExist) {
    var docOrgUsers = await organizationUsersManagement.create(docOrganizationUsersDraft, context.params)
    organizationUsersId = docOrgUsers._id
  } else {
    organizationUsersId = docs.data[0]._id
  }

  // remove organization-users
  await organizationUsersDraft.remove(docOrganizationUsersDraft._id)

  const isOrganizationStructuresUsersIdExist = (mergedId.length > 1)
  if(isOrganizationStructuresUsersIdExist) {
    const organizationStructuresUsersId = mergedId[1]
    await organizationStructuresUsersDraft.remove('publish_' + organizationStructuresUsersId) 
    await organizationStructuresUsers.patch(organizationStructuresUsersId, { organizationuser: organizationUsersId }, context.params)
  }

  context.result = docOrganizationUsersDraft
}

organizationusersHook.setOrganizationStructuresUsers = async (context) => {
  const userId = context.params.query.user
  const params = {
    query: { user: userId },
    paginate: false
  }

  const docsOrganizationStructuresUsers = await context.app.service('organizationstructuresusersmanagement').find(params)
  const getPositionsByOrganizationUsersId = (organizationUserId) => {
    var positionsResult = []

    for(let doc of docsOrganizationStructuresUsers) {
      if(doc.organizationuser.toString() == organizationUserId.toString()) {
        positionsResult.push(doc)
      }
    }

    return positionsResult
  }

  for(let doc of context.result.data) {
    doc.positions = getPositionsByOrganizationUsersId(doc._id)
  }
}

module.exports = organizationusersHook
