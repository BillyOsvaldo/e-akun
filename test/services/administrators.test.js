const assert = require('assert');
const app = require('../../src/app');

describe('\'administrators\' service', () => {
  it('registered the service', () => {
    const service = app.service('administrators');

    assert.ok(service, 'Registered the service');
  });
});
