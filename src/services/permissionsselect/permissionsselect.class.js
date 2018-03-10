module.exports = class addresses {
  async find (params) {
    const q = new RegExp(params.query.q, "i")
    const _result = await this.app.service('permissions')
      .find({
        query: {
          $or: [
            { _id: params.query.q },
            { app: params.query.q },
            { administrator: params.query.q }
          ],
          $skip: params.query.$skip,
          $limit: params.query.$limit,
          $select: params.query.$select,
          $sort: params.query.$sort
        }
      })
    return _result
  }

  setup (app) {
    this.app = app
  }

}
