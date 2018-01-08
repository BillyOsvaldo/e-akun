const assert = require('assert');
const app = require('../../src/app');

describe('\'menuroles\' service', () => {
  it('registered the service', () => {
    const service = app.service('menuroles');

    assert.ok(service, 'Registered the service');
  });
});
