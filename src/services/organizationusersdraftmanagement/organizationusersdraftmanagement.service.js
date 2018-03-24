const organizationusersdraftmanagement = require('./organizationusersdraftmanagement.class');
const hooks = require('./organizationusersdraftmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationusersdraftmanagement', new organizationusersdraftmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationusersdraftmanagement');

  service.hooks(hooks);
}
