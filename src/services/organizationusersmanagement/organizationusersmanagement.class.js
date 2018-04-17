module.exports = class {
  async create(data, params) {
    return await this.app.service('organizationusers').create(data, params)
  }

  async find(params) {
    params = params || {}
    params.query = params.query || {}
    params.query.organizationuser = { $exists: true, $ne: null }
    return await this.app.service('usersmanagement').find(params)
  }

  async get(id, params) {
    return await this.app.service('organizationusers').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationusers').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationusers').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
