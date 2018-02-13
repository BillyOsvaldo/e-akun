const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')
const moment = require('moment')

module.exports = class userApp {
  async create(data, params) {
    // to prevent validation error
    const setup = async () => {
      data.email = 'default@gmail.com'
      data.username = 'default'
    }

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

      const ret = { codeRegId: doc._id, opd: doc.opd, email: doc.email }
      return ret
    }

    const resolveOpd = async (opdId) => {
      const Opds = this.app.service('opds').Model
      const doc = await Opds.findOne({ _id: opdId })
      return doc
    }

    const useCodeReg = (id) => {
      const coderegs = this.app.service('coderegs')
      return coderegs.patch(id, { status: true })
    }

    const insertProfile = async () => {
      const profiles = this.app.service('profiles')
      const newProfile = await profiles.create(data)
      data.profile = newProfile
    }

    const buildUsername = async () => {
      const countSameGenderAndBirthDay = async () => {
        const Profiles = this.app.service('profiles').Model
        const count = await Profiles.count({ gender: data.gender, 'birth.day': data.birth.day })
        return count
      }

      const getSuffix = async () => {
        const countPlusOne = (await countSameGenderAndBirthDay()) + 1
        const suffix = countPlusOne.toString().padStart(3, '0')
        return suffix
      }

      const prefix = data.gender
      const middle = moment(data.birth.day).format('DDMMYY')
      const suffix = await getSuffix()
      const username = prefix.toString() + middle.toString() + suffix

      data.username = username
    }

    const setDefaultRole = async () => {
      if(data.role !== undefined) return

      const defaultRole = 'staff'
      const Roles = this.app.service('roles').Model
      const doc = await Roles.findOne({ tag: defaultRole })
      if(doc === null) {
        throw new errors.BadRequest('Role staff tidak ditemukan')
      }

      data.role = doc
    }

    const insertUser = async () => {
      const users = await this.app.service('users')
      const newUser = await users.create(data)
      data._id = newUser._id
      return newUser
    }

    setup()
    // try to check insert user and profile, if there is error, revert all inserted data
    await validate()

    const { codeRegId, opd, email } = await getCodeReg()
    data.opd = await resolveOpd(opd) // used for insertUser
    data.email = email // used for insertUser

    await setDefaultRole()
    await buildUsername()
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
