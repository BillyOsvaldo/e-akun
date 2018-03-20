// Initializes the `organizationstructuresusers` service on path `/organizationstructuresusers`
const createService = require('feathers-mongoose');
const createModel = require('../../models/organizationstructuresusers.model');
const hooks = require('./organizationstructuresusers.hooks');
const filters = require('./organizationstructuresusers.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'organizationstructuresusers',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/organizationstructuresusers', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('organizationstructuresusers');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
