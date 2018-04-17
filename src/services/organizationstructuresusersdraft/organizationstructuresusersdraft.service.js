// Initializes the `organizationstructuresusersdraft` service on path `/organizationstructuresusersdraft`
const createService = require('feathers-mongoose');
const createModel = require('../../models/organizationstructuresusersdraft.model');
const hooks = require('./organizationstructuresusersdraft.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'organizationstructuresusersdraft',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/organizationstructuresusersdraft', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructuresusersdraft');

  service.hooks(hooks);
};
