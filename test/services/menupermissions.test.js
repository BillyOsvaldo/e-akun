const assert = require('assert');
const app = require('../../src/app');

describe('\'menupermissions\' service', () => {
  it('registered the service', () => {
    const service = app.service('menupermissions');

    assert.ok(service, 'Registered the service');
  });
});
