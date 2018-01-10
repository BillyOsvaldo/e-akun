const coderegs = require('./coderegs/coderegs.service.js');
const users = require('./users/users.service.js');
const profiles = require('./profiles/profiles.service.js');
const checkuser = require('./checkuser/checkuser.service.js');
const checkcode = require('./checkcode/checkcode.service.js');
const menus = require('./menus/menus.service.js');
const userapp = require('./userapp/userapp.service.js');
const menuapp = require('./menuapp/menuapp.service.js');
const opds = require('./opds/opds.service.js');
const roles = require('./roles/roles.service.js');
const permissions = require('./permissions/permissions.service.js');
const apps = require('./apps/apps.service.js');
const administrators = require('./administrators/administrators.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(coderegs);
  app.configure(users);
  app.configure(profiles);
  app.configure(checkuser);
  app.configure(checkcode);
  app.configure(menus);
  app.configure(userapp);
  app.configure(menuapp);
  app.configure(opds);
  app.configure(roles);
  app.configure(permissions);
  app.configure(apps);
  app.configure(administrators);
};
