const errors = require('@feathersjs/errors')

module.exports = class AdministratorsManagement {
  async create(data, params) {
    return await this.app.service('users').create(data, params)
  }

  // able to sort by username
  async find(params) {
    // return only if users has permissions AND not admin organization

    const getAdminOrganizationId = async () => {
      const paramsAdministrator = { query: { tag: 'admin_organization' } }
      const resAdministrator = await this.app.service('administrators').find(paramsAdministrator)
      if(!resAdministrator.total) {
        throw new errors.BadRequest('Admin organization not found')
      }

      const docAdministrator = resAdministrator.data[0]
      return docAdministrator._id
    }

    const adminOrganizationId = await getAdminOrganizationId()

    params.query.$where = 'this.permissions.length > 0'
    params.query.permissions = { $ne: adminOrganizationId }
    return await this.app.service('users').find(params)
  }

  async get(id) {
    return await this.app.service('users').get(id)
  }

  async patch(id, data, params) {
    return await this.app.service('users').patch(id, data, params)
  }

  async remove(id, params) {
    return await this.app.service('users').remove(id, params)
  }

  setup(app) {
    this.app = app
  }
}
