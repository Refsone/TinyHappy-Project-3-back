const generator = require('generate-password')

// Generate a custom password
const createTempPassword = (req, res, next) => {
  const generatePwd = generator.generate({
    length: 12,
    numbers: true,
    strict: true
  })
  req.body.tempPassword = generatePwd
  next()
}

module.exports = { createTempPassword }
