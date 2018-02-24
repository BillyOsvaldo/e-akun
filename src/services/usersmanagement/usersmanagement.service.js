const usersmanagement = require('./usersmanagement.class');
const hooks = require('./usersmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/usersmanagement', new usersmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('usersmanagement');

  service.hooks(hooks);
}
