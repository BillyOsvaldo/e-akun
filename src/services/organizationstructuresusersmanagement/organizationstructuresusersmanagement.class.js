module.exports = class {
  async create(data, params) {
    return await this.app.service('organizationstructuresusers').create(data, params)
  }

  async find(params) {
    // handle sorting:start
    // efficient query
    var sortByFirstName = null
    var sortByLastName = null

    try {
      sortByFirstName = params.query.$sort['profile.name.first_name']
    } catch (e) {}

    try {
      sortByLastName = params.query.$sort['profile.name.last_name']
    } catch (e) {}
    // handle sorting:end

    var usersLimit = parseInt(params.query.$limit) || this.app.get('paginate').default
    var usersSkip  = parseInt(params.query.$skip) || 0

    if(params.query.$first_name_or_last_name || sortByFirstName || sortByLastName) {
      var paramsUsers = {
        query: {
          $only_id: 1,
          $sort: params.query.$sort
        }
      }

      if(params.query.$first_name_or_last_name) {
        paramsUsers.query.$first_name_or_last_name = params.query.$first_name_or_last_name
      }

      if(sortByFirstName) {
        paramsUsers.query.$sort['profile.name.first_name'] = sortByFirstName
      }

      if(sortByLastName) {
        paramsUsers.query.$sort['profile.name.last_name'] = sortByLastName
      }

      const docsUsers = await this.app.service('usersselect').find(paramsUsers)
      const usersIdList = docsUsers.data.map(doc => {
        if(doc._id) return doc._id
      })

      if(sortByFirstName || sortByLastName) {
        var docs = []
        for(let user of usersIdList) {
          let paramsInner = { query: { user: user } }
          let retTmp = await this.app.service('organizationstructuresusers').find(paramsInner)
          if(retTmp.data.length) {
            docs.push(retTmp.data[0])
          }
        }

        const docsLimitedAndSkipped = docs.slice(usersSkip, usersLimit)

        return {
          total: docsLimitedAndSkipped.length,
          limit: usersLimit,
          skip: usersSkip,
          data: docsLimitedAndSkipped
        }
      } else {
        params.query.user = { $in: usersIdList }
      }

      delete params.query.$first_name_or_last_name
    }

    return await this.app.service('organizationstructuresusers').find(params)
  }

  async get(id, params) {
    return await this.app.service('organizationstructuresusers').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationstructuresusers').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationstructuresusers').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
