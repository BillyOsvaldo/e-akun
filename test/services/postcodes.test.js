const assert = require('assert');
const app = require('../../src/app');

describe('\'postcodes\' service', () => {
  it('registered the service', () => {
    const service = app.service('postcodes');

    assert.ok(service, 'Registered the service');
  });
});
