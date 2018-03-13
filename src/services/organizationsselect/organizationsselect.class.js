module.exports = class organizationsselect {
  async find (params) {
    params.paginate = false
    const docs = await this.app.service('organizations').find(params)
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
