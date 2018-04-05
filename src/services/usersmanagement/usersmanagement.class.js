const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')
const moment = require('moment')
const mongoose = require('mongoose')

module.exports = class UsersManagement {
  async create(data, params) {

    const ObjectId = this.app.get('mongooseClient').Types.ObjectId

    // to prevent validation error
    const setup = async () => {
      data.email = 'default@gmail.com'
      data.username = 'default'

      if(!data.address) {
        data.address = {
          detail: ''
        }
      }
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

      if(!data.birth) {
        throw new errors.BadRequest('Tanggal lahir wajib diisi')
      }

      if(!moment(data.birth.day).isValid()) {
        throw new errors.BadRequest('Format tanggal lahir tidak valid')
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

      const ret = { codeRegId: doc._id, email: doc.email }
      return ret
    }

    const useCodeReg = (id) => {
      const coderegs = this.app.service('coderegsmanagement')
      return coderegs.patch(id, { status: true })
    }

    const insertProfile = async () => {
      const profiles = this.app.service('profiles')
      const newProfile = await profiles.create(data)
      data.profile = newProfile
    }

    const buildUsername = async () => {
      const countSameGenderAndBirthDay = async () => {
        const Users = this.app.service('users').Model
        // filter birth day
        const docsSameBirthDay = await Users.aggregate([
          {
            $project: {
              username: { $substr: [ '$username', 1, 6 ] },
              gender: { $substr: [ '$username', 0, 1 ] }
            }
          },
          {
            $match: {
              username: moment(data.birth.day).format('DDMMYY')
            }
          }
        ])

        // filter gender
        const docsGenderFiltered = docsSameBirthDay.filter(doc => doc.gender == data.gender)
        return docsGenderFiltered.length
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

    /*const setDefaultRole = async () => {
      if(data.role !== undefined) return

      const defaultRole = 'staff'
      const Roles = this.app.service('roles').Model
      const doc = await Roles.findOne({ tag: defaultRole })
      if(doc === null) {
        throw new errors.BadRequest('Role staff tidak ditemukan')
      }

      data.role = doc
    }*/

    const insertUser = async (codeRegId) => {
      data._id = codeRegId
      const users = await this.app.service('users')
      const newUser = await users.create(data)
      data._id = newUser._id
      return newUser
    }

    setup()
    // try to check insert user and profile, if there is error, revert all inserted data
    await validate()

    const { codeRegId, email } = await getCodeReg()
    data.email = email // used for insertUser

    //await setDefaultRole()
    await buildUsername()
    await insertProfile()
    await insertUser(codeRegId)
    await useCodeReg(codeRegId)

    return data
  }

  async find(params) {
    // query[0] is like $limit, profile.age, $skip
    // query[1] is like 29, string

    const getUsersQuery = () => {
      return Object.entries(params.query).filter(query => !query[0].startsWith('$') && !query[0].startsWith('profile.'))
    }

    const getProfilesQuery = () => {
      return Object.entries(params.query).filter(query => !query[0].startsWith('$') && query[0].startsWith('profile.'))
    }

    const Users = this.app.service('users').Model
    const aggregateData = []

    // add filter by users.organizationusers.organization
    const organizationId = params.query['organizationusers.organization']
    if(organizationId) {
      aggregateData.push({ $lookup: { from: 'organizationusers', localField: 'organizationuser', foreignField: '_id', as: 'organizationuser'} })
      aggregateData.push({ $unwind: { path: '$organizationuser', preserveNullAndEmptyArrays: true } })
      aggregateData.push({ $match: { 'organizationuser.organization': mongoose.Types.ObjectId(organizationId) } })
      delete params.query['organizationusers.organization']
    }

    // match user
    if(getUsersQuery().length) {
      let matchVal = {}
      for(let query of getUsersQuery()) {
        const queryVal = (mongoose.Types.ObjectId.isValid(query[1]) ? mongoose.Types.ObjectId(query[1]) : query[1])
        matchVal[query[0]] = queryVal
      }

      aggregateData.push({ $match: matchVal })
    }

    aggregateData.push({ $lookup: { from: 'profiles', localField: 'profile', foreignField: '_id', as: 'profile'} })
    aggregateData.push({ $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },)

    for(let k in params.query.$sort) {
      params.query.$sort[k] = parseInt(params.query.$sort[k])
    }

    if(params.query.$sort)
      aggregateData.push({ $sort: params.query.$sort })

    // match profile
    const profilesQuery = getProfilesQuery()
    if(profilesQuery.length) {
      const currentQuery = profilesQuery[0]
      const currentQueryKey = currentQuery[0]
      const currentQueryVal = currentQuery[1]
      let matchVal = {}
      const queryVal = (mongoose.Types.ObjectId.isValid(currentQueryVal) ? mongoose.Types.ObjectId(currentQueryVal) : currentQueryVal)
      matchVal[currentQueryKey] = queryVal

      aggregateData.push({ $match: matchVal })
    }

    if(params.query.$first_name_or_last_name) {
      const firstNameOrLastNameQuery = {
        $or: [
          { 'profile.name.first_name': new RegExp(params.query.$first_name_or_last_name, 'i') },
          { 'profile.name.last_name': new RegExp(params.query.$first_name_or_last_name, 'i') },
        ]
      }
      aggregateData.push({ $match: firstNameOrLastNameQuery })
      delete params.query.$first_name_or_last_name
    }

    if(params.query.$only_id) {
      aggregateData.push({ $project: { _id: 1 } })
      delete params.query.$only_id
    }

    const skip = parseInt(params.query.$skip) || 0
    const limit = parseInt(params.query.$limit) || this.app.get('paginate').default

    aggregateData.push({ $skip: skip })
    aggregateData.push({ $limit: limit })

    const getTotal = async () => {
      const where = {
        $and: [
          { profile: { "$nin": [ null ] } },
          { profile: { $exists: true } }
        ]
      }
      return await Users.count(where)
    }

    const docs = await Users.aggregate(aggregateData)
    return {
      "total": await getTotal(),
      "limit": limit,
      "skip": skip,
      "data": docs
    }
  }

  async get (userid) {
    let _output = []
    if (typeof userid !== 'undefined') {
      const _user = await this.app.service('users')
        .get(userid)
      return _user
    }
  }

  async patch(id, data, params) {
    // if data.update is 'self' then compare the password regardless his permission
    if(data.update === 'self') {
      if(!data.comparepassword)
        throw new errors.BadRequest('Password wajib diisi')

      let current = await this.app.service('users').get(id)
      let compare = await bcrypt.compareSync(data.comparepassword, current.password)
      if (!compare) {
        throw new errors.BadRequest('Kata Sandi Salah.')
      }
      delete data.comparepassword

      const _user = await this.app.service('users').patch(id, data, params)
      return _user
    } else if(data.update === 'account') {
      const _user = await this.app.service('users').patch(id, data, params)
      return _user
    } else if(data.update === 'profile') {
      let profile_id = data.id
      delete data.id
      delete data.update
      await this.app.service('profiles').patch(profile_id, data, params)
      const _user = await this.app.service('users').get(id)
      return _user
    } else {
      return await this.app.service('users').patch(id, data)
    }
  }

  async remove(id, params) {
    const users = this.app.service('users')
    const profiles = this.app.service('profiles')

    const docUser = await users.get(id)

    users.remove(id)
    profiles.remove(docUser.profile)
  }

  setup(app) {
    this.app = app
  }
}
