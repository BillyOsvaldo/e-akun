const rolesmanagement = require('./rolesmanagement.class');
const hooks = require('./rolesmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/rolesmanagement', new rolesmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rolesmanagement');

  service.hooks(hooks);
}
