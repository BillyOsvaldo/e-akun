const errors = require('@feathersjs/errors')

/*

format:
{
  "email": "example@gmail.com" -> coderegs.email
  "organization": "123123" -> organizationusersdraft.organization
  "organizationUsersStartDate": "2018-03-29" -> organizationusersdraft.startDate
  "inside": "12313" -> organizationusersdraft.inside
  "organizationstructure": "123123" -> organizationstructuresusersdraft.organizationstructure
  "organizationStructuresUsersStartDate": "2018-03-29" -> organizationstructuresusersdraft.startDate
}

*/

module.exports = class CoderegsManagement {
  async create(data, params) {
    const validate = () => {
      const requiredFields = [ 'email', 'organization', 'organizationUsersStartDate' ]
      for(let field of requiredFields) {
        if(!data[field]) throw new errors.BadRequest('Field ' + field + ' must be exist')
      }
    }

    const handleOrganizationUsersDraft = async (coderegId) => {
      const dataInner = {
        user: coderegId,
        organization: data.organization,
        inside: data.inside,
        startDate: data.organizationUsersStartDate
      }

      await this.app.service('organizationusersdraftmanagement').create(dataInner)

      delete data.organization
      delete data.inside
      delete data.organizationUsersStartDate
    }

    // optional
    const handleOrganizationStructuresUsersDraft = async (coderegId) => {
      if(!data.organizationstructure || !data.organizationStructuresUsersStartDate) return

      const dataInner = {
        user: coderegId,
        organizationstructure: data.organizationstructure,
        startDate: data.organizationStructuresUsersStartDate
      }

      await this.app.service('organizationstructuresusersdraftmanagement').create(dataInner)

      delete data.organizationstructure
      delete data.organizationStructuresUsersStartDate
    }

    validate()
    const docCoderegs = await this.app.service('coderegs').create(data, params)
    await handleOrganizationUsersDraft(docCoderegs._id)
    await handleOrganizationStructuresUsersDraft(docCoderegs._id)
    return docCoderegs
  }

  async find(params) {
    return await this.app.service('coderegs').find(params)
  }

  async get(id) {
    return await this.app.service('coderegs').get(id)
  }

  async patch(id, data, params) {
    if(data.status) {
      return await this.app.service('coderegs').patch(id, data)
    }

    const handleOrganizationUsersDraft = async (userId) => {
      const dataInner = {
        organization: data.organization,
        inside: data.inside,
        startDate: data.organizationUsersStartDate
      }

      const organizationUsersDraft = this.app.service('organizationusersdraftmanagement')
      const OrganizationUsersDraft = this.app.service('organizationusersdraft').Model

      const doc = await OrganizationUsersDraft.findOne({ user: userId })
      const docId = doc._id
      await organizationUsersDraft.patch(docId, dataInner)
    }

    // optional
    const handleOrganizationStructuresUsersDraft = async (userId) => {
      if(!data.organizationstructure || !data.organizationStructuresUsersStartDate) {
        const OrganizationStructuresUsersDraft = this.app.service('organizationstructuresusersdraft').Model
        await OrganizationStructuresUsersDraft.remove({ user: userId })
        return
      }

      var dataInner = {
        organizationstructure: data.organizationstructure,
        startDate: data.organizationStructuresUsersStartDate
      }

      const organizationStructuresUsersDraft = this.app.service('organizationstructuresusersdraftmanagement')
      const OrganizationStructuresUsersDraft = this.app.service('organizationstructuresusersdraft').Model

      const doc = await OrganizationStructuresUsersDraft.findOne({ user: userId })

      // if doc is not found then create, else do patch
      if(doc) {
        const docId = doc._id
        await organizationStructuresUsersDraft.patch(docId, dataInner)
      } else {
        dataInner.user = userId
        await organizationStructuresUsersDraft.create(dataInner)
      }
    }

    const userId = id
    await handleOrganizationUsersDraft(userId)
    await handleOrganizationStructuresUsersDraft(userId)
    return await this.get(userId)
  }

  async remove(id, params) {
    return await this.app.service('coderegs').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
