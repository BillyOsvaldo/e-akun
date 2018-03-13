module.exports = class structurepositionsManagement {
  async create(data, params) {
    return await this.app.service('structurepositions').create(data, params)
  }

  async find(params) {
    return await this.app.service('structurepositions').find(params)
  }

  async get(id) {
    return await this.app.service('structurepositions').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('structurepositions').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('structurepositions').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
