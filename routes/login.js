const express = require('express')
const router = express.Router()

const { connection, secret } = require('../conf')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { verifyEmail } = require('./services/verif.service')

const checkingtUser = (req, res, next) => {
  const userMail = req.body.userMail
  const userPassword = req.body.userPassword

  connection.query('SELECT *FROM user WHERE user_mail ?', [userMail], (err, result) => {
    if (err) {
      res.status(500).send('Error while connecting to DB' + err)
    } else if (!result[0]) {
      console.log('req is ok')
      return res.status(409).send('unknown user')
    }
    const pwdIsValid = bcrypt.compareSync(userPassword, result[0].userPassword)
    if (!pwdIsValid) {
      return res.status(401).send({ auth: false, token: null })
    }
    req.user = result[0]
    next()
  })
}

const generateToken = (req, res, next) => {
  const token = jwt.sign(
    { id: req.user.id },
    secret,
    { algorithm: 'RS256' }
  )
  res.header('Access-Control-Expose-Headers', 'x-access-token')
  res.set('x-access-token', token)
  res.status(200).send({ auth: true })
}

router.post('/', verifyEmail, checkingtUser, generateToken)

module.exports = router
