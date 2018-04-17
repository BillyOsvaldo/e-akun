module.exports = class {
  async create(data, params) {
    return await this.app.service('organizationstructuresusersdraft').create(data, params)
  }

  async find(params) {
    return await this.app.service('organizationstructuresusersdraft').find(params)
  }

  async get(id, params) {
    return await this.app.service('organizationstructuresusersdraft').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationstructuresusersdraft').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationstructuresusersdraft').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
