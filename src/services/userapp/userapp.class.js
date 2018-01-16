const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')

module.exports = class userApp {
  async get (userid) {
    let _output = []
    if (typeof userid !== 'undefined') {
      const _user = await this.app.service('users')
        .get(userid)
      return _user
    }
  }

  async patch (id, data, params) {
    if (data.update === 'account') {
      console.log('account')
      let current = await this.app.service('users').get(id)
      let compare = await bcrypt.compareSync(data.comparepassword, current.password)
      if (!compare) {
        throw new errors.BadRequest('Kata Sandi Salah.', {})
      } else {
        delete data.comparepassword
        delete data.update
        const _user = await this.app.service('users')
          .patch(id, data, params)
        return _user
      }
    } else if (data.update === 'profile') {
      console.log('profile')
      let profile_id = data.id
      delete data.id
      delete data.update
      await this.app.service('profiles').patch(profile_id, data, params)
      const _user = await this.app.service('users').get(id)
      return _user
    }
  }

  setup (app) {
    this.app = app
  }

}
