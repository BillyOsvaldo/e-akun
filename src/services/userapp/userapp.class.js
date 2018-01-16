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
    } if (data.update === 'profile') {
      delete data.update
      await this.app.service('profiles').patch(id, data, params)
      const _user = await this.app.service('users')
        .find({
          query: {
            profile: id
          }
        })
      return _user.data[0]
    }
  }

  setup (app) {
    this.app = app
  }

}
