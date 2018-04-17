module.exports = class {
  async create(data, params) {
    return await this.app.service('usersmanagement').create(data, params)
  }

  async find(params) {
    return await this.app.service('usersmanagement').find(params)
  }

  async get(id) {
    return await this.app.service('usersmanagement').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('usersmanagement').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('usersmanagement').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
