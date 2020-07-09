const express = require('express')
const bcrypt = require('bcryptjs')
const connection = require('../conf')
const router = express.Router()

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newPassword = req.body.newPassword
  const user_password = req.body.actualPassword

  connection.query('SELECT user_password FROM user WHERE id = ?', id, (err, result) => {
    const pwdIsValid = bcrypt.compareSync(user_password, result[0].user_password)
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    } else if (pwdIsValid) {
      const hashNewPassword = bcrypt.hashSync(newPassword)
      connection.query('UPDATE user SET user_password = ? WHERE id = ?', [hashNewPassword, id], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
            sql: err.sql
          })
        } else {
          res.status(201).json('password change successfully')
        }
      })
    } else {
      res.sendStatus(400)
    }
  }
  )
})

module.exports = router
