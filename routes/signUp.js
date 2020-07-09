const express = require('express')
const bcrypt = require('bcryptjs')
const { connection } = require('../conf')
const { verifyEmail } = require('../service/verif.service')

const router = express.Router()

const insertUser = (req, res) => {
  const user = {
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password),
    parameter_id: req.body.parameter_id
  }

  connection.query('INSERT INTO user SET ?', user, (err, result) => {
    if (err) {
      console.log('erreur', err)
      return res.status(500).send('Cannot register the user')
    } else {
      res.status(201).json(result)
    }
  })
}

router.post('/', verifyEmail, insertUser)

module.exports = router
