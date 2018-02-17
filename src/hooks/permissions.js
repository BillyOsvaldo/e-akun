const { populate } = require('feathers-hooks-common')
const { restrictToOwner } = require('feathers-authentication-hooks');

const permissions = {}

permissions.set = async (context) => {
  const jobsPermissions = context.params.user.permissions.map(permissionId => context.app.service('permissions').get(permissionId))
  const docsPermissions = await Promise.all(jobsPermissions)

  const jobsAdministrators = docsPermissions.map(doc => context.app.service('administrators').get(doc.administrator))
  const docsAdministrators = await Promise.all(jobsAdministrators)

  context.params.user.permissions = docsPermissions

  var i = 0
  for(let permission of context.params.user.permissions) {
    permission.administrator = docsAdministrators[i]
    i++
  }
}

permissions.restrict = async (context) => {
  await permissions.set(context)

  var admin = false
  for(let permission of context.params.user.permissions) {
    if(permission.administrator.tag == 'admin_organization') {
      admin = true
    }
  }

  console.log('is_admin', admin)
  if(!admin) {
    try {
      await restrictToOwner({
        idField: '_id',
        ownerField: '_id'
      })(context)
    } catch(e) {
      throw e
    }
  }
}

module.exports = permissions
