module.exports = class addresses {
  async find (params) {

    if(params.query.$or) {
      params.query.$or = params.query.$or.map(q => {
        if(q.app == '') q.app = null

        return q
      })
    }

    params.paginate = false
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
