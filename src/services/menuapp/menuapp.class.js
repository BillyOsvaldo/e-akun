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

      console.log(_menuperm)
      console.log(_menurole)

    }
    return _output
  }

  setup (app) {
    this.app = app
  }

}
