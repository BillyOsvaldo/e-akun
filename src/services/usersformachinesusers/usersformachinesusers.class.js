module.exports = class {
  async create(data, params) {
    return await this.app.service('users').create(data, params)
  }

  async find(params) {
    return await this.app.service('users').find(params)
  }

  async get(id, params) {
    params.query.$appid = this.app.get('appid')
    const doc = await this.app.service('users').get(id, params)
    return doc
  }

  async patch(id, data, params) {
    return await this.app.service('users').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('users').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
