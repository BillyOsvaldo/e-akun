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
  const organizationstructures = context.app.service('organizationstructures')
  context.data.docParent = await organizationstructures.get(context.data.parent)
}

organizationstructuresHook.decideOrder = async (context) => {
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

module.exports = organizationstructuresHook
