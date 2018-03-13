const organizationstructuresmanagement = require('./organizationstructuresmanagement.class');
const hooks = require('./organizationstructuresmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationstructuresmanagement', new organizationstructuresmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructuresmanagement');

  service.hooks(hooks);
}
