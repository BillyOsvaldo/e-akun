module.exports = class addresses {
  async find (params) {
    const q = new RegExp(params.query.q, "i")
    const _result = await this.app.service('postcodes')
      .find({
        query: {
          $or: [
            {kotakab: q},
            {kecamatan: q}
          ],
          $skip: params.query.$skip
        }
      })
    return _result
  }

  setup (app) {
    this.app = app
  }

}
