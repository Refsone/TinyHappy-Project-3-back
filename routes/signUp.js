const express = require('express')
const bcrypt = require('bcryptjs')
const { connection } = require('../conf')

const router = express.Router()
const SchemaValidator = require('../schemaValidator')
const validateRequest = SchemaValidator(true)
const { verifyEmail, verifyPassWord } = require('../services/verif.service')

router.post('/', verifyEmail, verifyPassWord, validateRequest, (req, res) => {
  const user = {
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password)
  }
  connection.query('INSERT INTO user SET ?', user, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    connection.query(`INSERT INTO parameter (user_id) VALUES (${result.insertId})`, (err, result) => {
      if (err) {
        console.log(err)
        return res.status(500).send('Cannot set user parameter')
      }
      connection.query('SELECT * from user WHERE id = ?', result.insertId, (err, result2) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
            sql: err.sql
          })
        }
        const host = req.get('host')
        const location = `http://${host}/users/${result.insertId}`

        const { user_password, ...infoUser } = result2[0]

        return res.status(201)
          .set('location', location)
          .json({ infoUser })
      })
    })
  })
})

module.exports = router
