const checkorganizationusers = require('./checkorganizationusers.class');
const hooks = require('./checkorganizationusers.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/checkorganizationusers', new checkorganizationusers());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkorganizationusers');

  service.hooks(hooks);
}
