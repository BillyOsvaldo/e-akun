module.exports = class {
  async find (params) {
    params.paginate = false
    const docs = await this.app.service('usersmanagement').find(params)
    return {
      "total": docs.data.length,
      "limit": docs.data.length,
      "skip": 0,
      "data": docs.data
    }
  }

  setup (app) {
    this.app = app
  }

}
