module.exports = class {
  async create(data, params) {
    // if context.data.organizationStructure is not empty then create organizationstructuresusers
    if(data.organizationStructure && data.organizationStructureStartDate) {
      const dataOrganizationstructuresusers = {
        user: data.user,
        organizationstructure: data.organizationStructure,
        startDate: data.organizationStructureStartDate
      }

      await this.app.service('organizationstructuresusersdraft').create(dataOrganizationstructuresusers, params)
    }

    return await this.app.service('organizationusersdraft').create(data, params)
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

    const aggregates = [
      { $match: match },
      // organizationstructuresusers
      {
        $lookup: {
          //from: 'organizationstructuresusers', // if not found, try comment this line and uncomment line below
          from: 'organizationstructuresusersdraft', // if not found, try comment this line and uncomment line below
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
      {
        $project: {
          _id: 1,
          startDate: 1,
          endDate: 1,
          'organizationstructuresusers.organizationstructure': '$organizationstructuresusers.organizationstructure',
          'organizationstructuresusers.startDate': '$organizationstructuresusers.startDate',
          'organizationstructuresusers.endDate': '$organizationstructuresusers.endDate',
          'organization.name': '$organization.name',
          'user._id': '$user._id',
          'user.profile.name': '$user.profile.name',
          'user.profile.nip': '$user.profile.nip',
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

  async get(id) {
    return await this.app.service('organizationusersdraft').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationusersdraft').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationusersdraft').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
