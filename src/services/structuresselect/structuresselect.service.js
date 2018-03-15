const structuresselect = require('./structuresselect.class');
const hooks = require('./structuresselect.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/structuresselect', new structuresselect());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('structuresselect');

  service.hooks(hooks);
}
