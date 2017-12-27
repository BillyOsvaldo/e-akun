const checkcode = require('./checkcode.class');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/checkcode', new checkcode());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('checkcode');
}
