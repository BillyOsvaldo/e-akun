const userapp = require('./userapp.class');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/userapp', new userapp());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('userapp');
}
