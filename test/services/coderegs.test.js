const assert = require('assert');
const app = require('../../src/app');

describe('\'coderegs\' service', () => {
  it('registered the service', () => {
    const service = app.service('coderegs');

    assert.ok(service, 'Registered the service');
  });
});
