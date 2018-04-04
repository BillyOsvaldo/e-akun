module.exports = class {
  async find (params) {
    params.paginate = false
    const getAdministratorId = async () => {
      const docAdministrator = await this.app.service('administrators').Model.findOne({ tag: 'admin_organization' })
      return docAdministrator._id
    }

    params.query.administrator = await getAdministratorId()
    const docs = await this.app.service('permissions').find(params)
    return {
      "total": docs.length,
      "limit": docs.length,
      "skip": 0,
      "data": docs
    }
  }

  setup (app) {
    this.app = app
  }

}
