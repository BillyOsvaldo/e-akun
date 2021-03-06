const errors = require('@feathersjs/errors')
const validator = require('validator')

/*

Usage:

checkuser.username:
get user name and name by email or username
/checkuser?username=example@gmail.com

checkuser.checkemail:
to check if email is already registered
/checkuser?email=example@gmail.com


*/

module.exports = class checkUser {
  async find(params) {
    const ObjectId = this.app.get('mongooseClient').Types.ObjectId
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

        const getAdminName = async (docUsers) => {
          const Permissions = this.app.service('permissions').Model
          const docPermissions = await Permissions.findOne({ _id: ObjectId(docUsers.permissions[0]) }).populate('administrator').populate('app')
          if(!docPermissions) {
            throw new errors.BadRequest('Tidak ada data permissions')
          }

          const docApp = JSON.parse(JSON.stringify(docPermissions.app))
          const name = {
            first_name: docPermissions.administrator.name,
            last_name: (docApp ? docApp.name : ''),
            first_title: '',
            last_title: ''
          }

          return name
        }

        const firstData = docs.data[0]
        var name
        if(firstData.profile) {
          name = firstData.profile.name
        } else {
          name = await getAdminName(firstData)
        }

        docs.data = [{
            username: firstData.username,
            name: name,
            status: "success"
        }]
        return docs
      }

      const ret = await getUser()
      return ret
    }

    const checkEmail = async () => {
      if(!validator.isEmail(queryEmail)) {
        throw new errors.BadRequest('Email tidak valid')
      }

      const filter = { query: { email: queryEmail } }

      const docs = await this.app.service('users').find(filter)

      if(docs.total > 0) {
        throw new errors.BadRequest('Email sudah digunakan')
      }

      return {
        "total": 1,
        "limit": 10,
        "skip": 0,
        "data": [{ "status": "success" }]
      }
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
