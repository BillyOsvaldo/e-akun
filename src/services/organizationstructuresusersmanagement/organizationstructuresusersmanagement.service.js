const organizationstructuresusersmanagement = require('./organizationstructuresusersmanagement.class');
const hooks = require('./organizationstructuresusersmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationstructuresusersmanagement', new organizationstructuresusersmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructuresusersmanagement');

  service.hooks(hooks);
}
