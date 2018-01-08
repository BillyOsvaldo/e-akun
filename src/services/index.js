const coderegs = require('./coderegs/coderegs.service.js');
const users = require('./users/users.service.js');
const profiles = require('./profiles/profiles.service.js');
const checkuser = require('./checkuser/checkuser.service.js');
const checkcode = require('./checkcode/checkcode.service.js');
const menus = require('./menus/menus.service.js');
const userapp = require('./userapp/userapp.service.js');
const menuapp = require('./menuapp/menuapp.service.js');
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
};
