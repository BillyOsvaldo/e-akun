module.exports = class addresses {
  async find (params) {
    const action = params.query.action
    let _output = []
    if (typeof action !== 'undefined') {
      if (action === 'propinsi') {
        const _prop = await this.app.service('postcodes')
          .Model.distinct('propinsi')
        return _prop
      }
    }
  }

  setup (app) {
    this.app = app
  }

}
