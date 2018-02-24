module.exports = class UsersManagement {
  async create(data, params) {
  }

  async find(params) {
  }

  async get(userid) {
  }

  async patch(id, data, params) {
    const _user = await this.app.service('users')
      .patch(id, data, params)
    return _user
  }

  async remove(id, params) {
  }

  setup(app) {
    this.app = app
  }
}
