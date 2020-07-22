const jwt = require('jsonwebtoken')
const { secret, connection } = require('../conf')
const passwordComplexity = require('joi-password-complexity')

const verifyPassWord = (req, res, next) => {
  console.log('verifyPassWord')
  const complexityOptions = {
    min: 8,
    max: 50,
    lowerCase: 0,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 0
  }
  console.log('beforeIf')
  if (passwordComplexity(complexityOptions).validate(req.body.user_password).error) {
    console.log('inIf')
    return res.status(403).send('Bad Password format')
  }
  next()
}

const verifyEmail = (req, res, next) => {
  console.log('verifyEmail')
  const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/
  if (!emailRegEx.test(req.body.user_mail)) {
    return res.status(401).send('Unauthorized user!')
  }
  next()
}

// Verify if the email exist in the database
const verifyDuplicateMail = (req, res, next) => {
  console.log('verifyDuplicateMail')
  connection.query('SELECT * from user WHERE user_mail = ?', req.body.user_mail, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    } else if (result[0]) {
      return res.status(403).send('email already exist')
    }
    next()
  })
}

// Verify if the email exist in the database
const verifyIfEmailExist = (req, res, next) => {
  connection.query('SELECT * from user WHERE user_mail = ?', req.body.user_mail, (err, result) => {
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

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, secret, (err, result) => {
      if (err) {
        return res.status(403).json(err)
      }
      next()
    })
  } else {
    return res.status(400).send('No token provided')
  }
}

module.exports = {
  verifyDuplicateMail,
  verifyEmail,
  verifyIfEmailExist,
  verifyPassWord,
  verifyToken
}
