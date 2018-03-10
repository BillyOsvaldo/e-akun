module.exports = class addresses {
  async find (params) {
    const q = new RegExp(params.query.q, "i")
    const _result = await this.app.service('roles')
      .find({
        query: {
          $or: [
            { _id: params.query.q },
            { name: q },
            { tag: q }
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
