const express = require('express')
const bcrypt = require('bcryptjs')
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

const insertUser = (req, res, next) => {
  const user = {
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password),
    parameter_id: req.body.parameter_id
  }

  connection.query('INSERT INTO user SET ?', user, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).send('Cannot register the user')
    }

    connection.query('SELECT user_firstname, user_lastname, user_mail FROM user WHERE id = ?', result.insertId, (err, result) => {
      if (err) {
        return res.status(500).send('Internal server error')
      }
      res.status(200).send(result)
    })
  })
}

router.post('/', verifyEmail, checkUser, insertUser)

module.exports = router
