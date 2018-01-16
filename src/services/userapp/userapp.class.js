const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')

module.exports = class userApp {
  async get (userid) {
    let _output = []
    if (typeof app !== 'undefined' && typeof userid !== 'undefined') {
      const _user = await this.app.service('users')
        .get(userid)
      console.log(_user)
      return _user
    }
  }

  async patch (id, data, params) {
    let current = await this.app.service('users').get(id)
    let compare = await bcrypt.compareSync(data.password, current.password)
    if (!compare) {
      throw new errors.BadRequest('Kata Sandi Salah.', {})
    } else {
      if (data.newpassword) {
        data.password = data.newpassword
        delete data.newpassword
      } else {
        delete data.password
      }
      const _user = await this.app.service('users')
        .patch(id, data, params)
      return _user
    }
  }

  setup (app) {
    this.app = app
  }

}
