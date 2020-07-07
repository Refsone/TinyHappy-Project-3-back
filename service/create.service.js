const generator = require('generate-password')
const bcrypt = require('bcryptjs')
const connection = require('../conf')

// Generate a custom password
const createTempPassword = (req, res, next) => {
  const generatePwd = generator.generate({
    length: 12,
    numbers: true,
    strict: true
  })
  req.body.tempPassword = generatePwd
  req.body.timeExp = (10 * 60) // Define here the number of minutes the tempory password is valid
  next()
}
// Add the new password and the expiration time to the bdd
const addTempPassword = (req, res, next) => {
  const expireTime = new Date().getTime() + req.body.timeExp // Define an expiration time for the custom password
  const reqData = {
    user_temp_password: bcrypt.hashSync(req.body.tempPassword),
    temp_password_limit: expireTime
  }
  connection.query('UPDATE user SET ? WHERE user_mail = ?', [reqData, req.body.user_mail], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    next()
  })
}

module.exports = { createTempPassword, addTempPassword }
