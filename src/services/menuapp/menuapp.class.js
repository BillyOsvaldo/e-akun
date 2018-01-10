module.exports = class menuApp {
  async find (params) {
    const permission = params.query.permission
    const role = params.query.role
    let _output = []
    if (typeof permission !== 'undefined' && typeof role !== 'undefined') {
      const _menu = await this.app.service('menus')
        .find({
          query: {
            $or: [
              {roles: role},
              {permissions: permission}
            ]
          }
        })
      _output = _menu
    }
    return _output
  }

  setup (app) {
    this.app = app
  }

}
