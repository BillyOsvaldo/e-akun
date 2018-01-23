module.exports = class addresses {
  async find (params) {
    const action = params.query.action
    let _output = []
    if (typeof action !== 'undefined') {
      if (action === 'propinsi') {
        console.log(this)
      }
    }
  }

  setup (app) {
    this.app = app
  }

}
