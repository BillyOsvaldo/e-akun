module.exports = class CoderegsManagement {
  async create(data, params) {
    return await this.app.service('coderegs').create(data, params)
  }

  async find(params) {
    return await this.app.service('coderegs').find(params)
  }

  async get(id) {
    return await this.app.service('coderegs').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('coderegs').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('coderegs').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
