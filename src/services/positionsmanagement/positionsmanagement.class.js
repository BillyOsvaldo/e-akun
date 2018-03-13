module.exports = class PositionsManagement {
  async create(data, params) {
    return await this.app.service('positions').create(data, params)
  }

  async find(params) {
    return await this.app.service('positions').find(params)
  }

  async get(id) {
    return await this.app.service('positions').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('positions').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('positions').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
