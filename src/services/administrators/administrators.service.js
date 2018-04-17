// Initializes the `administrators` service on path `/administrators`
const createService = require('feathers-mongoose');
const createModel = require('../../models/administrators.model');
const hooks = require('./administrators.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'administrators',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/administrators', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('administrators');

  service.hooks(hooks);
};
