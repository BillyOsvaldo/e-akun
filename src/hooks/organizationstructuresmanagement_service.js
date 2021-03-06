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

organizationstructuresHook.orderByOrderAsc = async function(context) {
  var sort = context.params.query.$sort

  if(sort === undefined) {
    context.params.query.$sort = { order: 1 }
  }
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

  function onlyUnique(value, index, self) { 
    return self.indexOf(value).toString() == index.toString();
  }

  const organizationstructures = context.app.service('organizationstructures')
  const docParent = context.data.docParent
  docParent.children.push(context.result._id)
  const newChildrenString = docParent.children.map((child) => child.toString())
  const newChildren = [...new Set(newChildrenString)]
  const updateData = { children: newChildren }

  await organizationstructures.patch(context.data.parent, updateData, context.params)
}

organizationstructuresHook.removeChildrenArrOfParent = async (context) => {
  if(!context.data.parent) return

  const ObjectId = context.app.get('mongooseClient').Types.ObjectId
  const organizationstructures = context.app.service('organizationstructures')

  const docSelf = await organizationstructures.get(context.id)

  // ignore if self.parent is null || empty
  if(docSelf.parent) {
    var docOldParent = await organizationstructures.get(docSelf.parent)
    docOldParent.children = docOldParent.children.filter((child) => (child != context.id))
    var updateData = { children: docOldParent.children }
    await organizationstructures.patch(docOldParent._id, updateData, context.params)
  }
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
      let childDoc = await organizationstructures.patch(childId, order, context.params)
      grandChildrenId = grandChildrenId.concat(childDoc.children)
    }

    await updateOrder(childOrder, grandChildrenId)
  }

  updateOrder(context.result.order, context.result.children)
}

module.exports = organizationstructuresHook
