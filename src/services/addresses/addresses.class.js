module.exports = class addresses {
  async find (params) {
    /*let _output = {
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
                  kotakab: params.query.kotakab,
                  kecamatan: params.query.kecamatan,
                  kelurahan: params.query.kelurahan
                }
              })
            if (_detail.total === 1) {
              _output.id = _detail.data[0]._id
              _output.kodepos = _detail.data[0].kodepos
            } else {
              _output.id = null
              _output.kodepos = null
            }

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
    }*/

    let output = []

    const q = new RegExp(query.params.q, "i")
    const _result = await this.app.service('postcodes')
      .find({
        query: {
          $or: {
            kotakab: q,
            kecamatan: q,
            kelurahan: q
          }
        }
      })
    return _result
  }

  setup (app) {
    this.app = app
  }

}
