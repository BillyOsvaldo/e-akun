module.exports = class addresses {
  async find (params) {
    const qRegex = new RegExp(params.query.q, "i")

    var query = {
      $skip: params.query.$skip,
      $limit: params.query.$limit,
      $select: params.query.$select,
      $sort: params.query.$sort
    }

    if(params.query.q !== undefined) {
      query.$or = [
        { _id: params.query.q },
        { app: params.query.q },
        { administrator: params.query.q }
      ]
    }

    const _result = await this.app.service('permissions').find({ query: query })
    return _result
  }

  setup (app) {
    this.app = app
  }

}
