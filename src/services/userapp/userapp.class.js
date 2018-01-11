const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')

module.exports = class userApp {
  async get (userid) {
    const app = this.app.get('appid')
    let _output = []
    if (typeof app !== 'undefined' && typeof userid !== 'undefined') {
      const _userperm = await this.app.service('users')
        .find({
          query: {
            _id: userid,
            $populate: [
              {
                path: 'profile'
              },
              {
                path: 'opd'
              },
              {
                path: 'role'
              },
              {
                path: 'permissions',
                match: {
                  app: app
                },
                populate: ['app', 'administrator']
              }
            ]
          }
        })

      if (_userperm.total === 1) {
        _output = _userperm.data[0]
      }

      return _output
    }
  }

  async patch (id, data, params) {
    let compare = await bcrypt.compareSync(data.password, params.user.password)
    if (!compare) {
      throw new errors.BadRequest('Kata Sandi Salah.', {})
    }
  }

  setup (app) {
    this.app = app
  }

}
