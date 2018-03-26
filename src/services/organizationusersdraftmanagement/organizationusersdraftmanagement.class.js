module.exports = class {
  async create(data, params) {
    // if context.data.organizationStructure is not empty then create organizationstructuresusers
    if(data.organizationStructure && data.organizationStructureStartDate) {
      const dataOrganizationstructuresusers = {
        user: data.user,
        organizationstructure: data.organizationStructure,
        startDate: data.organizationStructureStartDate
      }

      await this.app.service('organizationstructuresusersdraft').create(dataOrganizationstructuresusers, params)
    }

    return await this.app.service('organizationusersdraft').create(data, params)
  }

  async find(params) {
    // all field organizationusersdraft
    return await this.app.service('organizationusersdraft').find(params)
  }

  async get(id) {
    return await this.app.service('organizationusersdraft').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('organizationusersdraft').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('organizationusersdraft').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
