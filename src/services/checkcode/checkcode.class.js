module.exports = class checkCode {
  async find (params) {
    const code = params.query.code
    let _output = []
    if (typeof code !== 'undefined') {
      const _code = await this.app.service('coderegs')
        .find({
          query: {
            code: code,
            status: false
          }
        })
      if (_code.total > 0) {
        let output = {
          code: _code.data[0].code,
          opd: _code.data[0].opd,
          email: _code.data[0].email
        }
        _code.data.splice(0, 1)
        _code.data.push(output)
      }
      return _code
    }
  }

  setup (app) {
    this.app = app
  }

}
