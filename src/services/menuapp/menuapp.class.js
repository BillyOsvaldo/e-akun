module.exports = class menuApp {
  async find (params) {
    const permission = params.query.permission
    const role = params.query.role
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

    }
    return _menu
  }

  setup (app) {
    this.app = app
  }

}
