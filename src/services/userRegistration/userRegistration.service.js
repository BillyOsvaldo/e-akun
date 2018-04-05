const userRegistration = require('./userRegistration.class');
const hooks = require('./userRegistration.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/userRegistration', new userRegistration());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('userRegistration');

  service.hooks(hooks);
}
