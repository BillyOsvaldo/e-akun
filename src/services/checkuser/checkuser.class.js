const errors = require('@feathersjs/errors')

module.exports = class checkUser {
  async find(params) {
    const checkMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const username = params.query.username;
    let output = []
    if (typeof username !== 'undefined') {
      if (checkMail.test(username)) {
        const _user = await this.app.service('users')
          .find({
            query: {
              email: username,
              $populate: 'profile'
            }
          });
        if (_user.total > 0) {
          let _output = {
            username: _user.data[0].username,
            fullname: _user.data[0].profile.fullname
          }
          _user.data.splice(0, 1)
          _user.data.push(_output)
          output = _user;
        } else {
          output = throw new errors.NotFound('ID Akun tidak ditemukan!');
        }
      } else {
        const _user = await this.app.service('users')
          .find({
            query: {
              username: username,
              $populate: 'profile'
            }
          });
        if (_user.total > 0) {
          let _output = {
            username: _user.data[0].username,
            fullname: _user.data[0].profile.fullname
          }
          _user.data.splice(0, 1)
          _user.data.push(_output)
          output = _user;
        } else {
          const _profile = await this.app.service('profiles')
            .find({
              query: {
                nip: username
              }
            });
          if (_profile.total > 0) {
            const _idProfile = _profile.data[0]._id
            const _user = await this.app.service('users')
              .find({
                query: {
                  profile: _idProfile
                }
              });
            let _output = {
              username: _user.data[0].username,
              fullname: _profile.data[0].fullname
            }
            _user.data.splice(0, 1)
            _user.data.push(_output)
            output = _user;
          } else {
            output = throw new errors.NotFound('ID Akun tidak ditemukan!');
          }
        }
      }
    }
    return output
  }

  setup(app) {
    this.app = app;
  }
}
