const organizationstructuresselect = require('./organizationstructuresselect.class');
const hooks = require('./organizationstructuresselect.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/organizationstructuresselect', new organizationstructuresselect());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructuresselect');

  service.hooks(hooks);
}
