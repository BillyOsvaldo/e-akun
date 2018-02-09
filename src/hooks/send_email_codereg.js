const validator = require('validator')
const nodemailer = require('nodemailer')
const pug = require('pug')
const { resolve } = require('path')
const errors = require('@feathersjs/errors')

const sendEmailCodeReg = async function(context) {
  // email is required
  if(!context.data.email) return

  var code = context.data.code
  // if current context.id is email then no need to get code
  if(context.id && !validator.isEmail(context.id)) { // method: create|update
    const Coderegs = context.app.service('coderegs').Model
    const doc = await Coderegs.findOne({ _id: context.id })
    if(doc === null) {
      throw new errors.BadRequest('Kode tidak ditemukan')
    }
    if(doc.status === true) {
      throw new errors.BadRequest('Kode sudah digunakan')
    }

    code = doc.code
  }

  const getTemplate = () => {
    emailData = {
      code: code,
      link: `${ context.app.get('hostname') }/signup?code=${ code }`,
      logo: context.app.get('logo'),
      year: (new Date()).getFullYear()
    }

    const templateSrc = resolve(__dirname, '../../views/email_codereg.pug')
    return pug.compileFile(templateSrc)(emailData)
  }

  const sendEmail = (body) => {
    const transportConfig = context.app.get('nodemailer_transport')
    var transporter = nodemailer.createTransport(transportConfig)

    const mailOptions = {
      to: context.data.email,
      subject: 'Kode Registrasi e-Akun',
      html: body
    }

    transporter.sendMail(mailOptions)
  }

  const body = getTemplate()
  await sendEmail(body)
}

module.exports = sendEmailCodeReg