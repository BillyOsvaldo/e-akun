// description: return 6 digit huruf kapital dan angka, unique

// code reg length
const len = 6

// hook: generateCode
const generateCode = async function(context) {
  const Model = context.service.Model

  const randomString = () => {
    var result = ''
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for(let i = len; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
    return result
  }

  // check if unused-code is already exist
  const isCodeExist = async (argCode) => {
    const doc = await Model.findOne({ code: argCode, status: false })
    return (doc ? true : false)
  }

  var code = randomString()
  if(await isCodeExist(code)) {
    await generateCode(context)
  } else {
    context.data.code = code
  }
}

module.exports = generateCode