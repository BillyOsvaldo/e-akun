module.exports = class AdministratorsManagement {
  async create(data, params) {
    return await this.app.service('users').create(data, params)
  }

  async find(params) {
    return await this.app.service('users').find(params)
  }

  async get(id) {
    return await this.app.service('users').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('users').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('users').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
