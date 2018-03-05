const appsselect = require('./appsselect.class');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/appsselect', new appsselect());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('appsselect');
}
