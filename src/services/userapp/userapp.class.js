module.exports = class userApp {
  async find (params) {
    const app = params.query.app
    const userid = params.query.userid
    let _output = []
    if (typeof app !== 'undefined' && typeof userid !== 'undefined') {
      console.log('OK!')
      console.log('userid', userid)
      console.log('app', app)
      const _user = await this.app.service('users')
        .find({
          query: {
            id: userid,
            $populate: 'permissions'
          }
        })
      return _user
    }
  }

  setup (app) {
    this.app = app
  }

}
