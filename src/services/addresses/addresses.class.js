module.exports = class addresses {
  async find (params) {
    const q = new RegExp(params.query.q, "i")
    const _result = await this.app.service('postcodes')
      .find({
        query: {
          $or: [
            {kotakab: q},
            {kecamatan: q},
            {kelurahan: q}
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
