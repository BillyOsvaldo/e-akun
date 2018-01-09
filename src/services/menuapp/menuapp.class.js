module.exports = class menuApp {
  async find (params) {
    const permission = params.query.permission
    const role = params.query.role
    let _output = []
    if (typeof permission !== 'undefined' && typeof role !== 'undefined') {
      const _menuperm = await this.app.service('menupermissions')
        .find({
          query: {
            permission: permission
          }
        })

      const _menurole = await this.app.service('menuroles')
        .find({
          query: {
            role: role
          }
        })

      const _menu = await this.app.service('menus')
        .find()

      let menu = []
      _menuperm.data.forEach((item) => {
        menu.push(item.menu)
      })

      _menurole.data.forEach((item) => {
        menu.push(item.menu)
      })

      _menu.data.forEach((item) => {
        console.log(item)
        if (menu.filter(i => i === item._id)) {
          _output.push(item)
          console.log(item)
        }
      })

    }
    return _output
  }

  setup (app) {
    this.app = app
  }

}
