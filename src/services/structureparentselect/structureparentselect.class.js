/*
  Find all ancestors of current organzationstructures

  Flow:
    find all descendant
    docs = find all docs where _id not in `descendant id` and not current _id
*/
module.exports = class StructureParentSelect {

  async find(params) {
    const id = params.query.id
    const organizationstructures = this.app.service('organizationstructures')

    var descendantId = [] // final
    const findAllDescendantId = async (childrenId) => {
      if(!childrenId.length) return

      var grandChildrenId = []

      for(let childId of childrenId) {
        let childDoc = await organizationstructures.get(childId)
        descendantId = descendantId.concat(childDoc.children)
        grandChildrenId = grandChildrenId.concat(childDoc.children)
      }

      await findAllDescendantId(grandChildrenId)
    }

    var parentDoc = await organizationstructures.get(id)
    await findAllDescendantId(parentDoc.children)

    var nin = descendantId
    nin.push(id)

    // $nin is not in
    const query = {
      _id: { $nin: nin }
    }

    const byPassParams = {
      query,
      paginate: false
    }

    const docs = await this.app.service('organizationstructures').find(byPassParams)
    return {
      "total": docs.length,
      "limit": docs.length,
      "skip": 0,
      "data": docs
    }
  }

  setup(app) {
    this.app = app
  }
}
