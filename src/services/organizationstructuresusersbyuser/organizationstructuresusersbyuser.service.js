const organizationstructuresusersbyuser = require('./organizationstructuresusersbyuser.class');
const hooks = require('./organizationstructuresusersbyuser.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationstructuresusersbyuser', new organizationstructuresusersbyuser());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructuresusersbyuser');

  service.hooks(hooks);
}
