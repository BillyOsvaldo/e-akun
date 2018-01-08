const assert = require('assert');
const app = require('../../src/app');

describe('\'opds\' service', () => {
  it('registered the service', () => {
    const service = app.service('opds');

    assert.ok(service, 'Registered the service');
  });
});
