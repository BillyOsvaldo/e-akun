module.exports = class menuApp {
  async find (params) {
    const permission = params.query.permission
    let _output = []
    if (typeof permission !== 'undefined') {
      const _menuapp = await this.app.service('menuapp').find()
      _menuapp.forEach((item) => {
        if (item.permission.length === 0) {
          _output.push(item)
        } else {
          if (item.permission.contains(permission)) {
            _output.push(item)
          }
        }
      })
    }
    return _output
  }

  setup (app) {
    this.app = app
  }

}
