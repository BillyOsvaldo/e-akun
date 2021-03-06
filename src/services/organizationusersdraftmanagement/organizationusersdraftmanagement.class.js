module.exports = class {
  async create(data, params) {
    // if context.data.organizationStructure is not empty then create organizationstructuresusers
    if(Boolean(data.organizationStructure && data.organizationStructureStartDate)) {
      const dataOrganizationstructuresusers = {
        user: data.user,
        organizationstructure: data.organizationStructure,
        startDate: data.organizationStructureStartDate
      }

      await this.app.service('organizationstructuresusersdraft').create(dataOrganizationstructuresusers, params)
    }

    const organizationusersdraft = this.app.service('organizationusersdraft')
    const newDoc = await organizationusersdraft.create(data, params)
    const params2 = { query: { orgUserDraftId: newDoc._id } }
    const docs = await this.find(params2)
    const ret = docs.data[0]
    return ret
  }

  // Example:
  //   localhost:3030/organizationusersdraftmanagement?$sort[user.profile.name.first_name]=1
  //   localhost:3030/organizationusersdraftmanagement?organization=12321321313
  async find(params) {

    const ObjectId = this.app.get('mongooseClient').Types.ObjectId

    /*
      fields:
        - organizationusers._id
        - user.name
        - organization.name
        - organizationstructuresusers: {
          organizationstructures: lookup all,
          structure: organizationstructures.structure
        }
        - organizationUsersStartDate:
        - organizationStructuresUsersStartDate:
    */
    // all field organizationusersdraft

    const limit = parseInt(params.query.$limit) || this.app.get('paginate').default
    const skip = parseInt(params.query.$skip) || 0
    const organizationUsersDraft = this.app.service('organizationusersdraft').Model

    var sort = {}
    if(params.query.$sort) {
      for(let key in params.query.$sort)
        sort[key] = parseInt(params.query.$sort[key])
    } else {
      sort = { _id: 1 }
    }

    var match = { _id: { $exists: true } }
    if(params.query.organization) {
      match = { organization: ObjectId(params.query.organization) }
    }

    if(params.query.orgUserDraftId) {
      match = { _id: ObjectId(params.query.orgUserDraftId) }
    }

    const aggregates = [
      { $match: match },
      // organizationstructuresusers
      {
        $lookup: {
          //from: 'organizationstructuresusers', // if not found, try comment this line and uncomment line below
          from: 'organizationstructuresusersdrafts', // if not found, try comment this line and uncomment line below
          localField: 'user',
          foreignField: 'user',
          as: 'organizationstructuresusers'
        }
      },
      { $unwind: { path: '$organizationstructuresusers', preserveNullAndEmptyArrays: true } },
      // organizationstructuresusers.organizationstructure
      {
        $lookup: {
          from: 'organizationstructures',
          localField: 'organizationstructuresusers.organizationstructure',
          foreignField: '_id',
          as: 'organizationstructuresusers.organizationstructure'
        }
      },
      {
        $unwind: {
          path: '$organizationstructuresusers.organizationstructure',
          preserveNullAndEmptyArrays: true
        }
      },
      // organizationstructuresusers.organizationstructure.structure
      {
        $lookup: {
          from: 'structures',
          localField: 'organizationstructuresusers.organizationstructure.structure',
          foreignField: '_id',
          as: 'organizationstructuresusers.organizationstructure.structure'
        }
      },
      {
        $unwind: {
          path: '$organizationstructuresusers.organizationstructure.structure',
          preserveNullAndEmptyArrays: true
        }
      },
      // etc
      { $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user'} },
      { $unwind: '$user' },
      { $lookup: { from: 'organizations', localField: 'organization', foreignField: '_id', as: 'organization'} },
      { $unwind: '$organization' },
      { $lookup: { from: 'profiles', localField: 'user.profile', foreignField: '_id', as: 'user.profile'} },
      { $unwind: '$user.profile' },
      { $lookup: { from: 'organizationstructures', localField: 'inside', foreignField: '_id', as: 'inside'} },
      { $unwind: { path: '$inside', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          startDate: 1,
          endDate: 1,
          'organizationstructuresusers._id': '$organizationstructuresusers._id',
          'organizationstructuresusers.organizationstructure': '$organizationstructuresusers.organizationstructure',
          'organizationstructuresusers.startDate': '$organizationstructuresusers.startDate',
          'organizationstructuresusers.endDate': '$organizationstructuresusers.endDate',
          'organization.name': '$organization.name',
          'organization._id': '$organization._id',
          'user._id': '$user._id',
          'user.profile.name': '$user.profile.name',
          'user.profile.nip': '$user.profile.nip',
          inside: '$inside'
        }
      },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit }
    ]

    const docs = await organizationUsersDraft.aggregate(aggregates)
    return {
      total: docs.length,
      limit: limit,
      skip: skip,
      data: docs
    }
  }

  async get(id, params) {
    return await this.app.service('organizationusersdraft').get(id, params)
  }

  async patch(id, data, params) {
    const organizationStructuresUsersDraft = this.app.service('organizationstructuresusersdraft')
    const organizationUsersDraft = this.app.service('organizationusersdraft')

    // if context.data.organizationStructure is not empty then create organizationstructuresusers
    if(Boolean(data.organizationStructure && data.organizationStructureStartDate)) {
      const dataOrganizationstructuresusers = {
        organizationstructure: data.organizationStructure,
        startDate: data.organizationStructureStartDate
      }

      const docOrgStructUser = await organizationStructuresUsersDraft.Model.findOne({ user: data.user })

      if(docOrgStructUser) {
        await organizationStructuresUsersDraft.patch(docOrgStructUser._id, dataOrganizationstructuresusers, params)
      }
    }

    const doc = await this.app.service('organizationusersdraft').patch(id, data, params)

    const params2 = { query: { orgUserDraftId: doc._id } }
    const docs = await this.find(params2)
    if(docs.data.length) {
      return docs.data[0]
    } else {
      return {}
    }
  }

  async remove(id, params) {
    const organizationStructuresUsersDraft = this.app.service('organizationstructuresusersdraft')
    const organizationUsersDraft = this.app.service('organizationusersdraft')

    const docOrgUser = await organizationUsersDraft.get(id, params)
    const docOrgStructUser = await organizationStructuresUsersDraft.Model.findOne({ user: docOrgUser.user })

    if(docOrgStructUser) {
      await organizationStructuresUsersDraft.remove(docOrgStructUser._id, {})    
    }

    return await this.app.service('organizationusersdraft').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
