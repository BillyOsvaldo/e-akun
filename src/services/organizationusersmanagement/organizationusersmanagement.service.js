const organizationusersmanagement = require('./organizationusersmanagement.class');
const hooks = require('./organizationusersmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationusersmanagement', new organizationusersmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationusersmanagement');

  service.hooks(hooks);
}
