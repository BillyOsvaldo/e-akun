const bcrypt = require('bcryptjs')

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
    console.log(data.user.password)
    console.log(data.password)
    bcrypt.compare(data.user.password, data.password, (err, data1) => {
      if (err || !data1) {
        throw new errors.BadRequest('Kata Sandi Salah.');
      }
      delete data.password
      const _user = await this.app.service('users')
        .patch(id, data, params)
      return _user
    });
  }

  setup (app) {
    this.app = app
  }

}
