module.exports = class {
  async create(data, params) {
    return await this.app.service('administrators').create(data, params)
  }

  async find(params) {
    return await this.app.service('administrators').find(params)
  }

  async get(id) {
    return await this.app.service('administrators').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('administrators').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('administrators').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
