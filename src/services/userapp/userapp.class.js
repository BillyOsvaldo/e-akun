module.exports = class userApp {
  async find (params) {
    const app = params.query.app
    const userid = params.query.userid
    let _output = []
    if (typeof app !== 'undefined' && typeof userid !== 'undefined') {
      console.log('OK!')
      console.log('userid', userid)
      console.log('app', app)
      const _userperm = await this.app.service('userpermissions')
        .find({
          query: {
            user: userid,
            $populate: 'users',
            $populate: 'permission'
          }
        })
      return _userperm
    }
  }

  setup (app) {
    this.app = app
  }

}
