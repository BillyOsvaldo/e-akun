const errors = require('@feathersjs/errors')

module.exports = class {
  async find (params) {
    if(!params.query.user) {
      throw new errors.BadRequest('Param user must be exist')
    }

    params.query.$sort = { startDate: -1 }
    params.query.$skip = 1
    params.paginate = false

    const docs = await this.app.service('organizationusers').find(params)

    return {
      total: docs.length,
      limit: docs.length,
      skip: params.query.$skip,
      data: docs
    }
  }

  setup (app) {
    this.app = app
  }

}
