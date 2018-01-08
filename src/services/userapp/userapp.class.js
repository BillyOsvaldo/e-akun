module.exports = class userApp {
  async find (params) {
    const app = params.query.app
    const userid = params.query.userid
    let _output = []
    if (typeof app !== 'undefined' && typeof userid !== 'undefined') {
      const _user = await this.app.service('users')
        .find({
          query: {
            _id: userid,
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
