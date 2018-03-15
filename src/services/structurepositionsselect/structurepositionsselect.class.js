module.exports = class structurepositionsselect {
  async find (params) {
    params.paginate = false
    const docs = await this.app.service('structurepositions').find(params)
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
