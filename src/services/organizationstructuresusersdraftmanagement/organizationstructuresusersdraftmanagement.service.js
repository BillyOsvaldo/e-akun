const organizationstructuresusersdraftmanagement = require('./organizationstructuresusersdraftmanagement.class');
const hooks = require('./organizationstructuresusersdraftmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationstructuresusersdraftmanagement', new organizationstructuresusersdraftmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructuresusersdraftmanagement');

  service.hooks(hooks);
}
