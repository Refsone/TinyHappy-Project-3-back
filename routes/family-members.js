const express = require('express')
const router = express.Router()
const connection = require('../conf')
const SchemaValidator = require('../schemaValidator')

const validateRequest = SchemaValidator(true)

router.post('/new', validateRequest, (req, res) => {
  const formData = req.body

  connection.query('INSERT INTO family_member SET ?', formData, (err, results) => {
    if (err) {
      res.status(400).send('An error is occured when created a new member' + err)
    } else {
      console.log('req ok')
      res.status(201).send('New family user created')
    }
  })
})

router.put('/update', validateRequest, (req, res) => {
  const formData = req.body

  connection.query('UPDATE family_member SET ? WHERE id = ?', [formData, formData.id], (err, results) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
        sql: err.sql
      })
    }
    connection.query('SELECT * FROM family_member WHERE id = ?', formData.id, (err2, results2) => {
      if (err2) {
        return res.status(400).json({
          message: err2.message,
          sql: err2.sql
        })
      }
      const host = req.get('host')
      const location = `http://${host}/users/family-members/${formData.id}`
      return res.status(200)
        .set('location', location)
        .json({ results2 })
    })
  })
})

module.exports = router
