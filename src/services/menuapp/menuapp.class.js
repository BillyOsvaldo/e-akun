module.exports = class menuApp {
  async find (params) {
    const permission = params.query.permission
    const role = params.query.role
    let _output = []
    if (typeof permission !== 'undefined' && typeof role !== 'undefined') {
      console.log(permission)
      console.log(role)
      const _menu = await this.app.service('menus')
        .find({
          query: {
            $or: [
              {roles: role},
              {permissions: permission}
            ]
          }
        })

      console.log(_menu)

      if (_menu.total === 1) {
          _output = _menu.data[0]
      }

    }
    return _output
  }

  setup (app) {
    this.app = app
  }

}
