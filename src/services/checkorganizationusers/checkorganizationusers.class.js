module.exports = class AppsManagement {
  async find(params) {
    return await this.app.service('organizationusers').find(params)
  }

  setup(app) {
    this.app = app
  }
}
