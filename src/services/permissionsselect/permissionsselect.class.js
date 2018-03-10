module.exports = class addresses {
  async find (params) {
    return await this.app.service('permissions').find(params)
  }

  setup (app) {
    this.app = app
  }

}
