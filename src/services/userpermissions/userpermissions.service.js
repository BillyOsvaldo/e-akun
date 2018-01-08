// Initializes the `userpermissions` service on path `/userpermissions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/userpermissions.model');
const hooks = require('./userpermissions.hooks');
const filters = require('./userpermissions.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'userpermissions',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/userpermissions', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('userpermissions');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
