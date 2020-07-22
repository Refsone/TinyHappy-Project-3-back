const express = require('express')
const bcrypt = require('bcryptjs')
const { connection } = require('../conf')

const router = express.Router()
// const SchemaValidator = require('../schemaValidator')
// const validateRequest = SchemaValidator(false)
const { verifyDuplicateMail, verifyEmail, verifyPassWord } = require('../services/verif.service')

router.post('/', verifyEmail, verifyDuplicateMail, verifyPassWord, (req, res) => {
  console.log('Valide')
  const user = {
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_mail: req.body.user_mail,
    user_password: bcrypt.hashSync(req.body.user_password)
  }
  connection.query('INSERT INTO user SET ?', user, (err, result1) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    const createId = result1.insertId

    connection.query('SELECT * from user WHERE id = ?', createId, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          sql: err.sql
        })
      }
      const host = req.get('host')
      const location = `http://${host}/users/${createId}`
      const { user_password, ...infoUser } = result1

      connection.query(`INSERT INTO parameter (user_id) VALUES (${createId})`, (err, result) => {
        if (err) {
          return res.status(500).send('Cannot set user parameter')
        }
        return res.status(201)
          .set('location', location)
          .json({ infoUser })
      })
    })
  })
})

module.exports = router
