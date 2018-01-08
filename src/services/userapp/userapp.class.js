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

        let data = _userperm.data.filter(item => item.permission !== null)
        data[0].user.permission = data[0].permission
        _userperm.data[0] = data[0].user
      return _userperm
    }
  }

  setup (app) {
    this.app = app
  }

}
