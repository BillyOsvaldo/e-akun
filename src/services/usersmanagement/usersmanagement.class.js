module.exports = class UsersManagement {
  async create(data, params) {
  }

  async find(params) {
  }

  async get(userid) {
  }

  async patch(id, data, params) {
    if(data.update === 'account') {
      const _user = await this.app.service('users').patch(id, data, params)
      return _user
    } else if(data.update === 'profile') {
      let profile_id = data.id
      delete data.id
      delete data.update
      await this.app.service('profiles').patch(profile_id, data, params)
      const _user = await this.app.service('users').get(id)
      return _user
    }
  }

  async remove(id, params) {
  }

  setup(app) {
    this.app = app
  }
}
