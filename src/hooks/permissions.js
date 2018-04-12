const { authenticate } = require('feathers-authentication').hooks
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
  await authenticate('jwt')(context)

  var isAdmin
  if(!context.params.user) {
    isAdmin = false
    return isAdmin
  }

  if(context.params.user.permissions == null || !context.params.user.permissions.length) {
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

permissions.adminOnly = () => {
  return async (context) => {
    const isAdmin = await permissions.set(context)
    console.log('isAdmin', isAdmin)

    if(!isAdmin) throw new errors.BadRequest('Admin only')
  }
}

/*
  Permission admin organization allowed to edit everything in this service
  Permission admin aplikasi allowed to edit everything in this service as long as current application is same as his
  Permission user only allowed to edit his doc
*/
permissions.restrict = (ownerField = '_id') => {
  return async (context) => {
    console.log('ownerField', ownerField)

    var restricted = true
    const isAdmin = await permissions.set(context)

    if(isAdmin) {
      for(let permission of context.params.user.permissions) {
        // admin_application is special, they have to be in this app
        // they only got access if only curent app is equal as his app
        /*
        // TODO: restrict by admin application
        let isAdminApp = permission.administrator.tag == 'admin_application'
        if(!isAdminApp) {
          restricted = false
        } else {
          if(permission.app._id == context.app.get('appid'))
            restricted = false
        }*/
        restricted = false
      }
    }

    console.log('isAdmin', isAdmin)

    if(restricted) {
      await restrictToOwner({ idField: '_id', ownerField: ownerField })(context)
    }
  }
}

module.exports = permissions
