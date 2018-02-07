const validator = require('validator')
const errors = require('@feathersjs/errors')

/*
  resendEmail untuk mengirim ulang email yg berisi `kode registrasi`, `reset password`
*/

class resendEmail {
  async patch(id, data, params) {
    // ---------------------------------------------------------------------------------- validation
    const currentEmail = id
    if(!validator.isEmail(currentEmail))
      throw new errors.BadRequest('Format email tidak valid')

    const allowedTypes = [ 'codereg', 'resetpassword' ]
    if(!allowedTypes.includes(data.type)) {
      throw new errors.BadRequest('Tipe tidak diketahui')
    }

    // ---------------------------------------------------------------------------------- logic
    if(data.type === 'codereg') {
      const getCodeReg = async () => {
        const Coderegs = this.app.service('coderegs').Model
        return Coderegs.findOne({ email: currentEmail })
      }

      const docCodeReg = await getCodeReg()
      if(docCodeReg === null)
        throw new errors.BadRequest('Email tidak ditemukan')

      data.code = docCodeReg.code
      data.email = docCodeReg.email
      data.status = 'success'
    }

    return data
  }

  setup(app) {
    this.app = app
  }
}

module.exports = resendEmail
