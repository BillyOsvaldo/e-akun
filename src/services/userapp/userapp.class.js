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
                path: 'permission',
                match: {
                  app: app
                }
              }
            ]
          }
        })

      return _userperm
    }
  }

  setup (app) {
    this.app = app
  }

}
