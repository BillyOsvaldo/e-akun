const resendEmail = require('./resend_email.class');
const hooks = require('./resend_email.hooks');

module.exports = function () {
  const app = this;

  app.disable('etag');
  app.use('/resend-email', new resendEmail());
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('resend-email');

  service.hooks(hooks);
}
