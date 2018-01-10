const menuapp = require('./menuapp.class');
const hooks = require('./menuapp.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/menuapp', new menuapp());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('menuapp');

  service.hooks(hooks);
}
