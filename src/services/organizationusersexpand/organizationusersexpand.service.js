const organizationusersexpand = require('./organizationusersexpand.class');
const hooks = require('./organizationusersexpand.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationusersexpand', new organizationusersexpand());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationusersexpand');

  service.hooks(hooks);
}
