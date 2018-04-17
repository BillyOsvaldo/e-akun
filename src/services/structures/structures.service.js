// Initializes the `structures` service on path `/structures`
const createService = require('feathers-mongoose');
const createModel = require('../../models/structures.model');
const hooks = require('./structures.hooks');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'structures',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/structures', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('structures');

  service.hooks(hooks);
};
