const express = require('express')
const router = express.Router()

const { connection, secret } = require('../conf')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const { verifyEmail } = require('./services/verif.service')

const checkingtUser = (req, res, next) => {
  const userMail = req.body.user_mail
  const userPassword = req.body.user_password
  console.log(userMail)
  console.log(userPassword)

  connection.query('SELECT * FROM user WHERE user_mail = ?', userMail, (err, result) => {
    if (err) {
      res.status(500).send('Error while connecting to DB' + err)
    } else if (!result[0]) {
      console.log('req is ok')
      return res.status(409).send('unknown user')
    }
    console.log(result[0])
    const pwdIsValid = bcrypt.compareSync(userPassword, result[0].user_password)
    if (!pwdIsValid) {
      console.log(pwdIsValid)
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
    { algorithm: 'HS256' }
  )
  res.header('Access-Control-Expose-Headers', 'x-access-token')
  res.set('x-access-token', token)
  res.status(200).send({ auth: true })
}

const tokenIsValid = async (req, res) => {
  const userIsRegistered = req.body.user
  try {
    const token = req.header('x-auth-token')
    if (!token) return res.json(false)

    const verified = jwt.verify(token, secret)
    if (!verified) return res.json(false)

    const user = await userIsRegistered.findById(verified.id)
    if (!user) return res.json(false)

    return res.json(true)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

router.post('/', verifyEmail, checkingtUser, generateToken, tokenIsValid)

module.exports = router
