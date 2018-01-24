module.exports = class addresses {
  async find (params) {
    let _output = {
      provinsi: [],
      kotakab: [],
      kecamatan: [],
      kelurahan: [],
      id: null,
      kodepos: null
    }
    const _prop = await this.app.service('postcodes')
      .Model.distinct('propinsi')
    _output.provinsi = _prop

    if (typeof params.query.provinsi !== 'undefined') {
      const _kotakab = await this.app.service('postcodes')
        .Model.distinct('kotakab', {'propinsi': params.query.provinsi})
      _output.kotakab = _kotakab

      if (typeof params.query.kotakab !== 'undefined') {
        const _kecamatan = await this.app.service('postcodes')
          .Model.distinct('kecamatan', {'kotakab': params.query.kotakab})
        _output.kecamatan = _kecamatan

        if (typeof params.query.kecamatan !== 'undefined') {
          const _kelurahan = await this.app.service('postcodes')
            .Model.distinct('kelurahan', {'kecamatan': params.query.kecamatan})
          _output.kelurahan = _kelurahan

          if (typeof params.query.kelurahan !== 'undefined') {
            const _detail = await this.app.service('postcodes')
              .find({
                query: {
                  kelurahan: params.query.kelurahan
                }
              })
            console.log(_detail)  
            _output.id = _detail._id
            _output.kodepos = _detail.kodepos
          } else {
            _output.id = null
            _output.kodepos = null
          }
        } else {
          _output.kelurahan = []
        }
      } else {
        _output.kecamatan = []
      }
    } else {
      _output.kotakab = []
    }

    return _output
  }

  setup (app) {
    this.app = app
  }

}
