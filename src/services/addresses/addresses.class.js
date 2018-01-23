module.exports = class addresses {
  async find (params) {
    const action = params.query.action
    let _output = []
    if (typeof action !== 'undefined') {
      if (action === 'provinsi') {
        const _prop = await this.app.service('postcodes')
          .Model.distinct('propinsi')
        return _prop
      } else if (action === 'kotakab') {
        if (typeof params.query.provinsi !== 'undefined') {
          const _kotakab = await this.app.service('postcodes')
            .Model.distinct('kotakab', {'propinsi': params.query.provinsi})
          return _kotakab
        }
      }
    }
  }

  setup (app) {
    this.app = app
  }

}
