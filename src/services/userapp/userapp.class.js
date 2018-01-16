const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')

module.exports = class userApp {
  async get (userid) {
    let _output = []
    if (typeof userid !== 'undefined') {
      const _user = await this.app.service('users')
        .get(userid)
      console.log(_user)
      return _user
    }
  }

  async patch (id, data, params) {
    console.log(data)
    console.log(params)
    if (typeof data.comparepassword === 'undefined') {
      let current = await this.app.service('users').get(id)
      let compare = await bcrypt.compareSync(data.comparepassword, current.password)
      if (!compare) {
        throw new errors.BadRequest('Kata Sandi Salah.', {})
      } else {
        delete data.comparepassword
        params.query.app = this.app.get('appid')
        const _user = await this.app.service('users')
          .patch(id, data, params)
        return _user
      }
    }
  }

  setup (app) {
    this.app = app
  }

}
