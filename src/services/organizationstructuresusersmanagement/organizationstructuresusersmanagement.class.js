module.exports = class {
  async create(data, params) {
    return await this.app.service('organizationstructuresusers').create(data, params)
  }

  async find(params) {
    return await this.app.service('organizationstructuresusers').find(params)
  }

  async get(id) {
    return await this.app.service('organizationstructuresusers').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationstructuresusers').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationstructuresusers').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
