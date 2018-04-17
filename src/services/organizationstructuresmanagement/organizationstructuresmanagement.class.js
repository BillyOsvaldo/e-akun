module.exports = class OrganizationStructuresManagement {
  async create(data, params) {
    return await this.app.service('organizationstructures').create(data, params)
  }

  async find(params) {
    return await this.app.service('organizationstructures').find(params)
  }

  async get(id, params) {
    return await this.app.service('organizationstructures').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationstructures').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationstructures').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
