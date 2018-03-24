module.exports = class {
  async create(data, params) {
    return await this.app.service('organizationusersdraft').create(data, params)
  }

  async find(params) {
    return await this.app.service('organizationusersdraft').find(params)
  }

  async get(id) {
    return await this.app.service('organizationusersdraft').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationusersdraft').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationusersdraft').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
