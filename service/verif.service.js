const connexion = require('../conf')

const verifyEmail = (req, res, next) => {
  const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  if (!emailRegEx.test(req.body.user_mail)) {
    return res.status(400).send('Email format is not valid')
  }
  return next()
}

// Verify if the email exist in the database
const verifyIfEmailExist = (req, res, next) => {
  connexion.query('SELECT * from user WHERE user_mail = ?', req.body.user_mail, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    } else if (!result[0]) {
      return res.status(404).send('The selected email doesn\'t exist in the dataBase')
    }
    req.body.name = result[0].user_firstname
    next()
  })
}

module.exports = { verifyEmail, verifyIfEmailExist }
