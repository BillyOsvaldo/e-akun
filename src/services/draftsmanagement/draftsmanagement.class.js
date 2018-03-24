module.exports = class {
  async create(data, params) {
    return await this.app.service('drafts').create(data, params)
  }

  async find(params) {
    return await this.app.service('drafts').find(params)
  }

  async get(id) {
    return await this.app.service('drafts').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('drafts').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('drafts').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
