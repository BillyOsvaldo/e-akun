module.exports = class addresses {
  async find (params) {
    const action = params.query.action
    let _output = []
    if (typeof action !== 'undefined') {
      if (action === 'propinsi') {
        console.log(this.app.get('postcodes'))
        const _prop = await this.app.service('postcodes')
          .find({
            query: {
              $select: ['propinsi'],
              $limit: 0
            }
          })
        return _prop
      }
    }
  }

  setup (app) {
    this.app = app
  }

}
