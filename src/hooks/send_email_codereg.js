const nodemailer = require('nodemailer')
const pug = require('pug')
const { resolve } = require('path')

const sendEmailCodeReg = async function(context) {
  if(!context.data.code || !context.data.email) return

  const getTemplate = () => {
    emailData = {
      code: context.data.code,
      link: `${ context.app.get('hostname') }/signup?code=${ context.data.code }`,
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