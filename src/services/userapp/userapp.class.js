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
    console.log(params.user.password)
    console.log(data.password)
    let check = false
    await bcrypt.compare(params.user.password, data.password, (err, data1) => {
      if (err || !data1) {
        throw new errors.BadRequest('Kata Sandi Salah.');
      }
      check = true
    })

    if (check) {
      delete data.password
      const _user = await this.app.service('users')
        .patch(id, data, params)
      return _user
    }
  }

  setup (app) {
    this.app = app
  }

}
