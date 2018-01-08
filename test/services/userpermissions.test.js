const assert = require('assert');
const app = require('../../src/app');

describe('\'userpermissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('userpermissions');

    assert.ok(service, 'Registered the service');
  });
});
