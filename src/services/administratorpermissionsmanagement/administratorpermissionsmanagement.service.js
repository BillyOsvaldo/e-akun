const administratorpermissionsmanagement = require('./administratorpermissionsmanagement.class');
const hooks = require('./administratorpermissionsmanagement.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/administratorpermissionsmanagement', new administratorpermissionsmanagement());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('administratorpermissionsmanagement');

  service.hooks(hooks);
}
