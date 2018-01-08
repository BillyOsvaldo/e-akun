// Initializes the `menupermissions` service on path `/menupermissions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/menupermissions.model');
const hooks = require('./menupermissions.hooks');
const filters = require('./menupermissions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'menupermissions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/menupermissions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('menupermissions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
