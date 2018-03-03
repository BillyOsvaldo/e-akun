module.exports = class AppsManagement {
  async create(data, params) {
    return await this.app.service('apps').create(data, params)
  }

  async find(params) {
    return await this.app.service('apps').find(params)
  }

  async get(id) {
    return await this.app.service('apps').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('apps').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('apps').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
