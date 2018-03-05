const permissionsmanagement = require('./permissionsmanagement.class');
const hooks = require('./permissionsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/permissionsmanagement', new permissionsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('permissionsmanagement');

  service.hooks(hooks);
}
