module.exports = class userApp {
  async get (userid) {
    const app = this.app.get('appid')
    let _output = []
    if (typeof app !== 'undefined' && typeof userid !== 'undefined') {
      const _userperm = await this.app.service('userpermissions')
        .find({
          query: {
            user: userid,
            $populate: [
              {
                path: 'user'
              },
              {
                path: 'permission',
                match: {
                  app: app
                }
              }
            ]
          }
        })

        _userperm.data = _userperm.data.filter(item => item.permission !== null)
        _userperm.data[0].user.permission = _userperm.data[0].permission
        _userperm.data.push(_userperm.data[0].user)
        _user.data.splice(0, 1)
      return _userperm
    }
  }

  setup (app) {
    this.app = app
  }

}
