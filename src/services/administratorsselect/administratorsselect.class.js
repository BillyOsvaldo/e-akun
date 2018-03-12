module.exports = class addresses {
  async find (params) {
    const q = new RegExp(params.query.q, "i")
    const docs = await this.app.service('administrators')
      .find({
        query: {
          $or: [
            { name: q },
            { tag: q }
          ],
          $skip: params.query.$skip,
          $limit: params.query.$limit,
          $select: params.query.$select,
          $sort: params.query.$sort
        },
        paginate: false
      })
    return {
      "total": docs.length,
      "limit": docs.length,
      "skip": 0,
      "data": docs
    }
  }

  setup (app) {
    this.app = app
  }

}
