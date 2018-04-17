module.exports = class StructuresManagement {
  async create(data, params) {
    return await this.app.service('structures').create(data, params)
  }

  async find(params) {
    return await this.app.service('structures').find(params)
  }

  async get(id, params) {
    return await this.app.service('structures').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('structures').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('structures').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
