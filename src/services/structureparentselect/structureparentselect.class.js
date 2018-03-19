/*
  Find all ancestors of current organzationstructures

  Flow:
    find all descendant
    docs = find all docs where _id not in `descendant id` and not current _id
*/

Array.prototype.flatten = function() {
  return this.reduce(function(prev, cur) {
    var more = [].concat(cur).some(Array.isArray)
    return prev.concat(more ? cur.flatten() : cur)
  },[])
}

module.exports = class StructureParentSelect {

  async find(params) {
    const ObjectId = this.app.get('mongooseClient').Types.ObjectId

    const id = params.query.id
    const organizationstructures = this.app.service('organizationstructures')
    const Organizationstructures = organizationstructures.Model

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

    var children = []
    var parentDocs = await Organizationstructures.find({ organization: ObjectId(id) })
    children = parentDocs.map(doc => doc.children)
    children = children.flatten()

    await findAllDescendantId(children)

    var nin = descendantId

    // $nin is not in
    const queryNinId = { _id: { $nin: nin } }
    const queryNinOrganizationId = { organization: ObjectId(id) }
    const queryStructures = { 'structure.name': new RegExp('asisten', 'i') }

    const docs = await Organizationstructures.aggregate([
      { $match: queryNinId },
      { $lookup: { from: 'structures', localField: 'structure', foreignField: '_id', as: 'structure'} },
      {
        $match: {
          $or: [
            queryNinOrganizationId,
            queryStructures
          ]
        }
      }
    ])

    /*
    const byPassParams = {
      query,
      paginate: false
    }
    const docs = await this.app.service('organizationstructures').find(byPassParams)
    */

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
