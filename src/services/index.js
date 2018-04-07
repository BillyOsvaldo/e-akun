const coderegs = require('./coderegs/coderegs.service.js')
const users = require('./users/users.service.js')
const profiles = require('./profiles/profiles.service.js')
const checkuser = require('./checkuser/checkuser.service.js')
const checkcode = require('./checkcode/checkcode.service.js')
const menus = require('./menus/menus.service.js')
const menuapp = require('./menuapp/menuapp.service.js')
const organizations = require('./organizations/organizations.service.js')
const roles = require('./roles/roles.service.js')
const permissions = require('./permissions/permissions.service.js')
const apps = require('./apps/apps.service.js')
const administrators = require('./administrators/administrators.service.js')
const postcodes = require('./postcodes/postcodes.service.js')
const addresses = require('./addresses/addresses.service.js')
const resendEmail = require('./resend_email/resend_email.service.js')
const UsersManagement = require('./usersmanagement/usersmanagement.service.js')
const OrganizationsManagement = require('./organizationsmanagement/organizationsmanagement.service.js')
const CoderegsManagement = require('./coderegsmanagement/coderegsmanagement.service.js')
const AppsManagement = require('./appsmanagement/appsmanagement.service.js')
const PermissionsManagement = require('./permissionsmanagement/permissionsmanagement.service.js')
const MenusManagement = require('./menusmanagement/menusmanagement.service.js')
const AppsSelect = require('./appsselect/appsselect.service.js')
const AdministratorsSelect = require('./administratorsselect/administratorsselect.service.js')
const AdministratorsManagement = require('./administratorsmanagement/administratorsmanagement.service.js')
const RolesSelect = require('./rolesselect/rolesselect.service.js')
const PermissionsSelect = require('./permissionsselect/permissionsselect.service.js')
const structures = require('./structures/structures.service.js')
const structuresmanagement = require('./structuresmanagement/structuresmanagement.service.js')
const organizationstructures = require('./organizationstructures/organizationstructures.service.js')
const organizationstructuresselect = require('./organizationstructuresselect/organizationstructuresselect.service.js')
const organizationstructuresmanagement = require('./organizationstructuresmanagement/organizationstructuresmanagement.service.js')
const positions = require('./positions/positions.service.js')
const positionsmanagement = require('./positionsmanagement/positionsmanagement.service.js')
const rolesmanagement = require('./rolesmanagement/rolesmanagement.service.js')
const structuresselect = require('./structuresselect/structuresselect.service.js')
const organizationsselect = require('./organizationsselect/organizationsselect.service.js')
const checkemail = require('./checkemail/checkemail.service.js')
const checkusername = require('./checkusername/checkusername.service.js')
const structureparentselect = require('./structureparentselect/structureparentselect.service.js')
const organizationusers = require('./organizationusers/organizationusers.service.js')
const organizationusersmanagement = require('./organizationusersmanagement/organizationusersmanagement.service.js')
const organizationstructuresusers = require('./organizationstructuresusers/organizationstructuresusers.service.js')
const organizationstructuresusersmanagement = require('./organizationstructuresusersmanagement/organizationstructuresusersmanagement.service.js')
const usersselect = require('./usersselect/usersselect.service.js')
const administratorpermissionsmanagement = require('./administratorpermissionsmanagement/administratorpermissionsmanagement.service.js')
const organizationusersexpand = require('./organizationusersexpand/organizationusersexpand.service.js')
const organizationusersdraft = require('./organizationusersdraft/organizationusersdraft.service.js')
const organizationusersdraftmanagement = require('./organizationusersdraftmanagement/organizationusersdraftmanagement.service.js')
const organizationstructuresusersdraft = require('./organizationstructuresusersdraft/organizationstructuresusersdraft.service.js')
const organizationstructuresusersdraftmanagement = require('./organizationstructuresusersdraftmanagement/organizationstructuresusersdraftmanagement.service.js')
const administratorsorganizationsmanagement = require('./administratorsorganizationsmanagement/administratorsorganizationsmanagement.service.js')
const permissionsadminorganizationsselect = require('./permissionsadminorganizationsselect/permissionsadminorganizationsselect.service.js')
const organizationusersbyuser = require('./organizationusersbyuser/organizationusersbyuser.service.js')
const organizationstructuresusersbyuser = require('./organizationstructuresusersbyuser/organizationstructuresusersbyuser.service.js')
const userRegistration = require('./userRegistration/userRegistration.service.js')
const allorganizationusersdraft = require('./allorganizationusersdraft/allorganizationusersdraft.service.js')

module.exports = function () {
  const app = this
  app.configure(coderegs)
  app.configure(users)
  app.configure(profiles)
  app.configure(checkuser)
  app.configure(checkcode)
  app.configure(menus)
  app.configure(menuapp)
  app.configure(organizations)
  app.configure(roles)
  app.configure(permissions)
  app.configure(apps)
  app.configure(administrators)
  app.configure(postcodes)
  app.configure(addresses)
  app.configure(resendEmail)
  app.configure(UsersManagement)
  app.configure(OrganizationsManagement)
  app.configure(CoderegsManagement)
  app.configure(AppsManagement)
  app.configure(PermissionsManagement)
  app.configure(MenusManagement)
  app.configure(AppsSelect)
  app.configure(AdministratorsSelect)
  app.configure(AdministratorsManagement)
  app.configure(RolesSelect)
  app.configure(PermissionsSelect)
  app.configure(structures)
  app.configure(structuresmanagement)
  app.configure(organizationstructures)
  app.configure(organizationstructuresselect)
  app.configure(organizationstructuresmanagement)
  app.configure(positions)
  app.configure(positionsmanagement)
  app.configure(rolesmanagement)
  app.configure(structuresselect)
  app.configure(organizationsselect)
  app.configure(checkemail)
  app.configure(checkusername)
  app.configure(structureparentselect)
  app.configure(organizationusers)
  app.configure(organizationusersmanagement)
  app.configure(organizationstructuresusers)
  app.configure(organizationstructuresusersmanagement)
  app.configure(usersselect)
  app.configure(administratorpermissionsmanagement)
  app.configure(organizationusersexpand)
  app.configure(organizationusersdraft)
  app.configure(organizationusersdraftmanagement)
  app.configure(organizationstructuresusersdraft)
  app.configure(organizationstructuresusersdraftmanagement)
  app.configure(administratorsorganizationsmanagement)
  app.configure(permissionsadminorganizationsselect)
  app.configure(organizationusersbyuser)
  app.configure(organizationstructuresusersbyuser)
  app.configure(userRegistration)
  app.configure(allorganizationusersdraft)
}
