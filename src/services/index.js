const coderegs = require('./coderegs/coderegs.service.js');
const users = require('./users/users.service.js');
const profiles = require('./profiles/profiles.service.js');
const checkuser = require('./checkuser/checkuser.service.js');
const checkcode = require('./checkcode/checkcode.service.js');
const menus = require('./menus/menus.service.js');
const menuapp = require('./menuapp/menuapp.service.js');
const organizations = require('./organizations/organizations.service.js');
const roles = require('./roles/roles.service.js');
const permissions = require('./permissions/permissions.service.js');
const apps = require('./apps/apps.service.js');
const administrators = require('./administrators/administrators.service.js');
const postcodes = require('./postcodes/postcodes.service.js');
const addresses = require('./addresses/addresses.service.js');
const resendEmail = require('./resend_email/resend_email.service.js');
const UsersManagement = require('./usersmanagement/usersmanagement.service.js');
const OrganizationsManagement = require('./organizationsmanagement/organizationsmanagement.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(coderegs);
  app.configure(users);
  app.configure(profiles);
  app.configure(checkuser);
  app.configure(checkcode);
  app.configure(menus);
  app.configure(menuapp);
  app.configure(organizations);
  app.configure(roles);
  app.configure(permissions);
  app.configure(apps);
  app.configure(administrators);
  app.configure(postcodes);
  app.configure(addresses);
  app.configure(resendEmail);
  app.configure(UsersManagement);
  app.configure(OrganizationsManagement);
};
