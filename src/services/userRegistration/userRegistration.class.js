const errors = require('@feathersjs/errors')

module.exports = class {
  async create(data, params) {
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

    const publishOrganizationUsersAndOrganizationStructuresUsers = async (codeRegId) => {
      // setup
      const ObjectId = this.app.get('mongooseClient').Types.ObjectId
      const organizationUsersDraft = this.app.service('organizationusersdraft')
      const organizationUsersDraftManagement = this.app.service('organizationusersdraftmanagement')
      const organizationStructuresUsersDraft = this.app.service('organizationstructuresusersdraft')
      const organizationStructuresUsersDraftManagement = this.app.service('organizationstructuresusersdraftmanagement')

      // publish organizationusers
      const organizationUsersId = (await organizationUsersDraft.Model.findOne({ user: ObjectId(codeRegId) }))._id
      await organizationUsersDraftManagement.remove('publish_' + organizationUsersId) 

      // publish organizationstructuresusers
      const docOrganizationStructuresUsers = await organizationStructuresUsersDraft.Model.findOne({ user: ObjectId(codeRegId) })
      if(docOrganizationStructuresUsers) {
        await organizationStructuresUsersDraftManagement.remove('publish_' + docOrganizationStructuresUsers._id) 
      }
    }

    const { codeRegId, email } = await getCodeReg()
    const doc = await this.app.service('usersmanagement').create(data, params)
    await publishOrganizationUsersAndOrganizationStructuresUsers(codeRegId)

    return doc
  }

  async find(params) {
    return await this.app.service('usersmanagement').find(params)
  }

  async get(id, params) {
    return await this.app.service('usersmanagement').get(id, params)
  }

  async patch(id, data, params) {
    return await this.app.service('usersmanagement').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('usersmanagement').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
