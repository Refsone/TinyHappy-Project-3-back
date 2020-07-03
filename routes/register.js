const express = require('express')
const { connection } = require('../conf')
const { verifyEmail } = require('./services/verif.service')

const router = express.Router()

const checkUser = (req, res, next) => {
  connection.query('SELECT id FROM user WHERE user_mail = ?', req.body.user_mail, (err, result) => {
    if (err) {
      return res.status(500).send('internal server error')
    } else if (result.length > 0) {
      return res.status(409).send('User already exists')
    }
    next()
  })
}

router.post('/', verifyEmail, checkUser)

module.exports = router
