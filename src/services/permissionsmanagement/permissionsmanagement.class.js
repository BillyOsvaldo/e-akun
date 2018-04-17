module.exports = class PermissionsManagement {
  async create(data, params) {
    return await this.app.service('permissions').create(data, params)
  }

  async find(params) {
    return await this.app.service('permissions').find(params)
  }

  async get(id, params) {
    return await this.app.service('permissions').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('permissions').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('permissions').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
