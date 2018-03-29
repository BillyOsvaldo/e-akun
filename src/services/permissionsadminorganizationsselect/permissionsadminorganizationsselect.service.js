const permissionsadminorganizationsselect = require('./permissionsadminorganizationsselect.class');
const hooks = require('./permissionsadminorganizationsselect.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/permissionsadminorganizationsselect', new permissionsadminorganizationsselect());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('permissionsadminorganizationsselect');

  service.hooks(hooks);
}
