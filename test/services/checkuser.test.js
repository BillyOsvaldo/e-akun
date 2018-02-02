const assert = require('assert');
const app = require('../../src/app');

/*

wildan
198907051001
dckristiono@gmail.com

gagal:
19890705100
wildan fathan
dckristiono@gmai@l.com

*/

describe('\'checkuser\' service', () => {
  it('registered the service', () => {
    const service = app.service('checkuser');

    assert.ok(service, 'Registered the service');
  });
  
  it('check username: wildan', async () => {
    const service = app.service('checkuser');

    const params = {
      query: {
        username: 'wildan'
      }
    }
    const docs = service.find(params)

    assert.ok(docs, 'Registered the service');
  });
  
  it('should get username', () => {
    const service = app.service('checkuser');

    assert.ok(service, 'Registered the service');
  });

});
