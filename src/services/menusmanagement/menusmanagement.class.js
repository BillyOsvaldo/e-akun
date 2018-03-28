module.exports = class MenusManagement {
  async create(data, params) {
    return await this.app.service('menus').create(data, params)
  }

  async find(params) {
    //params.fromServiceMenuManagement = true
    params.paginate = false
    const docs = await this.app.service('menus').find(params)
    return {
      "total": docs.length,
      "limit": docs.length,
      "skip": 0,
      "data": docs
    }
  }

  async get(id) {
    return await this.app.service('menus').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('menus').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('menus').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
