module.exports = class {
  async create(data, params) {
    return await this.app.service('organizationusers').create(data, params)
  }

  async find(params) {
    return await this.app.service('organizationusers').find(params)
  }

  async get(id) {
    return await this.app.service('organizationusers').get(id)
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
