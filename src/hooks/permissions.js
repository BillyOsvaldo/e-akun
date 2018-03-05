const { populate } = require('feathers-hooks-common')
const { restrictToOwner } = require('feathers-authentication-hooks');
const bcrypt = require('bcryptjs')
const errors = require('@feathersjs/errors')

const permissions = {}

permissions.isAdmin = (context) => {
  if(Array.isArray(context.params.user.permissions))
    return Boolean(context.params.user.permissions.length)

  return false
}

/*
  @return is_admin Boolean
*/
permissions.set = async (context) => {
  var isAdmin
  if(!context.params.user) {
    isAdmin = false
    return isAdmin
  }
  if(context.params.user.permissions == [] || context.params.user.permissions == null) {
    isAdmin = false
    return isAdmin
  }

  var jobsPermissions
  if(Array.isArray(context.params.user.permissions)) {
    jobsPermissions = context.params.user.permissions.map(permissionId => context.app.service('permissions').get(permissionId))
  } else {
    jobsPermissions = [context.params.user.permissions]
  }

  const docsPermissions = await Promise.all(jobsPermissions)

  const jobsAdministrators = docsPermissions.map(doc => context.app.service('administrators').get(doc.administrator))
  const docsAdministrators = await Promise.all(jobsAdministrators)

  context.params.user.permissions = docsPermissions

  var i = 0
  for(let permission of context.params.user.permissions) {
    permission.administrator = docsAdministrators[i]
    i++
  }

  isAdmin = true
  return isAdmin
}

/*
  Role admin organization allowed to edit everything in this service
  Role admin aplikasi allowed to edit everything in this service as long as current application is same as his
  Role user only allowed to edit his doc
*/
permissions.restrict = async (context) => {
  var restricted = true
  const isAdmin = await permissions.set(context)

  if(isAdmin) {
    for(let permission of context.params.user.permissions) {
      if(permission.administrator.tag == 'super_admin') {
        restricted = false
      } else if(permission.administrator.tag == 'admin_organization') {
        restricted = false
      } else if(permission.administrator.tag == 'kepala_daerah') {
        restricted = false
      } else if(permission.administrator.tag == 'admin_application' && permission.app._id == context.app.get('appid')) {
        restricted = false
      }
    }
  }

  if(restricted) {
    await restrictToOwner({ idField: '_id', ownerField: '_id' })(context)
  }
}

module.exports = permissions
