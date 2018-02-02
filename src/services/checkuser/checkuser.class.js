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
        const filter = {}
        filter[queryBy] = queryUsername
        const usersModel = this.app.service('users').Model
        const doc = await usersModel.findOne(filter).populate('profile')
        if(doc === null) {
          throw new errors.BadRequest('ID Akun/NIP tidak ditemukan.', {username: queryUsername})
        }
        console.log('doc', doc)

        return [ doc.username, doc.name ]
      }

      const [ username, name ] = await getUser()

      return {
        username: username,
        name: name
      }
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
      throw new BadRequest('unknown query')
    }
  }

  setup(app) {
    this.app = app;
  }
}
