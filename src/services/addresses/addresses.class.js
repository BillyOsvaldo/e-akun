module.exports = class addresses {
  async find (params) {
    const action = params.query.action
    let _output = []
    if (typeof action !== 'undefined') {
      if (action === 'propinsi') {
        const _prop = await this.app.service('postcodes')
          .find({
            query: {
              $select: ['propinsi'],
              $limit: -1
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
