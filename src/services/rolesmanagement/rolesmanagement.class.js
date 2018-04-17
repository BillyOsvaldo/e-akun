module.exports = class RolesManagement {
  async create(data, params) {
    return await this.app.service('roles').create(data, params)
  }

  async find(params) {
    return await this.app.service('roles').find(params)
  }

  async get(id, params) {
    return await this.app.service('roles').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('roles').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('roles').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
