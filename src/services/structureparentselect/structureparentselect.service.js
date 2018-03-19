const structureparentselect = require('./structureparentselect.class');
const hooks = require('./structureparentselect.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/structureparentselect', new structureparentselect());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('structureparentselect');

  service.hooks(hooks);
}
