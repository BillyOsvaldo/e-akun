const administratorsselect = require('./administratorsselect.class');
const hooks = require('./administratorsselect.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/administratorsselect', new administratorsselect());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('administratorsselect');

  service.hooks(hooks);
}
