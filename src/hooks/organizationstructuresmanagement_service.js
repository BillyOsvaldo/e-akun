const { populate } = require('feathers-hooks-common');

const organizationstructuresHook = {}
organizationstructuresHook.populate = async (context) => {
  var populateSchema = {
    include: [
      {
        service: 'structures',
        nameAs: 'structure',
        parentField: 'structure',
        childField: '_id'
      },
      {
        service: 'organizations',
        nameAs: 'organization',
        parentField: 'organization',
        childField: '_id',
        include: [
          {
            service: 'postcodes',
            nameAs: 'address.postcode',
            parentField: 'address.postcode',
            childField: '_id'
          }
        ]
      },
      {
        service: 'roles',
        nameAs: 'role',
        parentField: 'role',
        childField: '_id'
      }
    ]
  }

  await populate({ schema: populateSchema })(context)
}

organizationstructuresHook.setParentData = async (context) => {
  if(!context.data.parent) return

  const organizationstructures = context.app.service('organizationstructures')
  context.data.docParent = await organizationstructures.get(context.data.parent)
}

organizationstructuresHook.decideSelfOrder = async (context) => {
  if(!context.data.parent) return

  const docParent = context.data.docParent
  context.data.order = docParent.order + 1
}


organizationstructuresHook.pushToParent = async (context) => {
  if(!context.data.parent) return

  const organizationstructures = context.app.service('organizationstructures')
  const docParent = context.data.docParent
  docParent.children.push(context.result._id)
  const newChildren = docParent.children
  const updateData = { children: newChildren }

  await organizationstructures.patch(context.data.parent, updateData)
}

organizationstructuresHook.removeChildrenArrOfParent = async (context) => {
  if(!context.data.parent) return

  const ObjectId = context.app.get('mongooseClient').Types.ObjectId
  const organizationstructures = context.app.service('organizationstructures')

  const docSelf = await organizationstructures.get(context.id)
  var docOldParent = await organizationstructures.get(docSelf.parent)
  docOldParent.children = docOldParent.children.filter((child) => (child != context.id))
  const updateData = { children: docOldParent.children }
  await organizationstructures.patch(docOldParent._id, updateData)
}

organizationstructuresHook.decideDescendantsOrder = async (context) => {
  if(!context.result.children.length) return

  const organizationstructures = context.app.service('organizationstructures')

  const updateOrder = async (currentOrder, childrenId) => {
    if(!childrenId.length) return

    var grandChildrenId = []
    let childOrder = currentOrder + 1
    let order = { order: childOrder }

    for(let childId of childrenId) {
      let childDoc = await organizationstructures.patch(childId, order)
      grandChildrenId = grandChildrenId.concat(childDoc.children)
    }

    await updateOrder(childOrder, grandChildrenId)
  }

  updateOrder(context.result.order, context.result.children)
}

module.exports = organizationstructuresHook
