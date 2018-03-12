module.exports = class AdministratorsManagement {
  async create(data, params) {
    return await this.app.service('users').create(data, params)
  }

  // able to sort by username
  async find(params) {
    // return only if users has permissions
    params.query.$where = 'this.permissions.length > 0'
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
