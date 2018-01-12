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
        
      console.log(_user)
      return _user
    }
  }

  setup (app) {
    this.app = app
  }

}
