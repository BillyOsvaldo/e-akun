module.exports = class OrganizationsManagement {
  async create(data, params) {
    return await this.app.service('organizations').create(data, params)
  }

  async find(params) {
    return await this.app.service('organizations').find(params)
  }

  async get(id) {
    return await this.app.service('organizations').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('organizations').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizations').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
