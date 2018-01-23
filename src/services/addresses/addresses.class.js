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
      } else if (action === 'kecamatan') {
        if (typeof params.query.kotakab !== 'undefined') {
          const _kecamatan = await this.app.service('postcodes')
            .Model.distinct('kecamatan', {'kotakab': params.query.kotakab})
          return _kecamatan
        }
      } else if (action === 'kelurahan') {
        if (typeof params.query.kecamatan !== 'undefined') {
          const _kelurahan = await this.app.service('postcodes')
            .Model.distinct('kelurahan', {'kecamatan': params.query.kecamatan})
          return _kelurahan
        }
      }
    }
  }

  setup (app) {
    this.app = app
  }

}
