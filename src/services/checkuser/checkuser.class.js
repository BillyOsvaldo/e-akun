const errors = require('@feathersjs/errors')
const validator = require('validator')

/*

Usage:

checkuser.username:
get user name and name by email or username
/checkuser?email=example@gmail.com

checkuser.checkemail:
to check if email is already registered
/checkuser?email=example@gmail.com


*/

module.exports = class checkUser {
  async find(params) {
    const queryUsername = params.query.username
    const queryEmail = params.query.email

    const checkUsername = async () => {
      var queryBy
      if(validator.isEmail(queryUsername)) {
        queryBy = 'email'
      } else {
        queryBy = 'username'
      }

      const getUser = async () => {
        const filter = { query: { $populate: 'profile' } }
        filter.query[queryBy] = queryUsername
        const docs = await this.app.service('users').find(filter)
        if(docs.total === 0) {
          throw new errors.BadRequest('ID Akun/NIP tidak ditemukan.', {username: queryUsername})
        }

        return docs
      }

      const ret = await getUser()
      return ret
    }

    const checkEmail = async () => {
        const filter = { query: { email: queryEmail } }

        const docs = await this.app.service('users').find(filter)

        if(docs.total > 0) {
          throw new errors.BadRequest('Email sudah digunakan')
        }

        return { status: 'success' }
    }

    if(queryUsername) {
      return await checkUsername()
    } else if (queryEmail) {
      return await checkEmail()
    } else {
      throw new errors.BadRequest('unknown query')
    }
  }

  setup(app) {
    this.app = app;
  }
}
