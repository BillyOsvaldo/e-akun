// Initializes the `organizationusersdraft` service on path `/organizationusersdraft`
const createService = require('feathers-mongoose');
const createModel = require('../../models/organizationusersdraft.model');
const hooks = require('./organizationusersdraft.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'organizationusersdraft',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/organizationusersdraft', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationusersdraft');

  service.hooks(hooks);
};
