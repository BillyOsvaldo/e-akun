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
    return await this.app.service('coderegs').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('coderegs').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
