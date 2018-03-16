const errors = require('@feathersjs/errors')
const validator = require('validator')

module.exports = class checkemail {
  async find(params) {
    var query
    var prefixMsg = ''

    if(params.query.email) {
      query = { email: new RegExp(params.query.email, 'i') }
      prefixMsg = 'Email'
    } else if(params.query.username) {
      query = { username: params.query.username }
      prefixMsg = 'Username'
    }

    const docs = await this.app.service('users').find({ query: query })
    if(docs.total === 0) {
      return { status: 'success' }
    } else {
      throw new errors.BadRequest(prefixMsg + ' sudah digunakan')
    }
  }

  setup(app) {
    this.app = app;
  }
}
