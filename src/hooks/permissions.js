const { populate } = require('feathers-hooks-common')
const { restrictToOwner } = require('feathers-authentication-hooks');

const permissions = {}

permissions.isAdmin = (context) => {
  if(Array.isArray(context.params.user.permissions))
    return Boolean(context.params.user.permissions)

  return false
}

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

/*
  standard user have to provide his password in data.comparepassword and matched
*/
permissions.matchPassword = async (context) => {
  const isAdmin = permissions.isAdmin(context)
  // if current user is admin then no need to check the pw
  if(isAdmin) return

  let current = await this.app.service('users').get(context.id)
  let compare = await bcrypt.compareSync(data.comparepassword, current.password)
  if (!compare) {
    throw new errors.BadRequest('Kata Sandi Salah.', {})
  }
  delete data.comparepassword
}

module.exports = permissions
