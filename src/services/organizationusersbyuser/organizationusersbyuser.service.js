const organizationusersbyuser = require('./organizationusersbyuser.class');
const hooks = require('./organizationusersbyuser.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationusersbyuser', new organizationusersbyuser());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationusersbyuser');

  service.hooks(hooks);
}
