const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')

module.exports = class userApp {
  async create(data, params) {
    const validate = async () => {
      const users = this.app.service('users')
      const profiles = this.app.service('profiles')
      const checkUser = new users.Model(data)
      const checkProfile = new profiles.Model(data)
      await checkUser.validate()
      await checkProfile.validate()

      const docUser1 = await users.Model.findOne({ email: data.email })
      if(docUser1 !== null) {
        throw new errors.BadRequest('Email telah digunakan')
      }

      const docUser2 = await users.Model.findOne({ username: data.username })
      if(docUser2 !== null) {
        throw new errors.BadRequest('Username telah digunakan')
      }
    }

    const getCodeReg = async () => {
      const coderegs = this.app.service('coderegs')
      const filter = {
        code: data.codereg,
        status: false,
      }
      const doc = await coderegs.Model.findOne(filter)
      if(doc === null) {
        throw new errors.BadRequest('Kode salah')
      }

      const ret = { codeRegId: doc._id, opd: doc.opd }
      return ret
    }

    const useCodeReg = (id) => {
      const coderegs = this.app.service('coderegs')
      return coderegs.patch(id, { status: true })
    }

    const insertProfile = async () => {
      const profiles = this.app.service('profiles')
      const newProfile = await profiles.create(data)
      data.profile = newProfile._id
    }

    const insertUser = async () => {
      const users = await this.app.service('users')
      const newUser = await users.create(data)
      return newUser
    }

    // try to check insert user and profile, if there is error, revert all inserted data
    await validate()

    const { codeRegId, opd } = await getCodeReg()
    data.opd = opd // used for insertUser

    await insertProfile()
    await insertUser()
    await useCodeReg(codeRegId)

    return data
  }

  async find(params) {
    const users = this.app.service('users')
    const docsUser = await users.find(params)
    return docsUser
  }

  async get (userid) {
    let _output = []
    if (typeof userid !== 'undefined') {
      const _user = await this.app.service('users')
        .get(userid)
      return _user
    }
  }

  async patch (id, data, params) {
    if (data.update === 'account') {
      console.log('account')
      let current = await this.app.service('users').get(id)
      let compare = await bcrypt.compareSync(data.comparepassword, current.password)
      if (!compare) {
        throw new errors.BadRequest('Kata Sandi Salah.', {})
      } else {
        delete data.comparepassword
        delete data.update
        const _user = await this.app.service('users')
          .patch(id, data, params)
        return _user
      }
    } else if (data.update === 'profile') {
      console.log('profile')
      let profile_id = data.id
      delete data.id
      delete data.update
      await this.app.service('profiles').patch(profile_id, data, params)
      const _user = await this.app.service('users').get(id)
      return _user
    }
  }

  async remove(id, params) {
    const users = this.app.service('users')
    const profiles = this.app.service('profiles')

    const docUser = await users.get(id)

    users.remove(id)
    profiles.remove(docUser.profile)
  }

  setup (app) {
    this.app = app
  }

}
