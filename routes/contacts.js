const express = require('express')
const router = express.Router()
const connection = require('../conf')
const SchemaValidator = require('../schemaValidator')

const validateRequest = SchemaValidator(true)

const error = (err, res) => {
  if (err) {
    return res.status(500).json({
      message: err.message,
      sql: err.sql
    })
  }
}

// Add a new contact
router.post('/new', validateRequest, (req, res) => {
  const { mail, user_id } = req.body
  connection.query('INSERT INTO contact SET ?', { mail: mail }, (err, result) => {
    error(err, res)
    console.log(result.insertId)
    const insertId = result.insertId
    const idsToInsert = {
      contact_id: insertId,
      user_id: user_id
    }
    connection.query('INSERT INTO user_contact SET ?', idsToInsert, (err, result2) => {
      error(err, res)
      connection.query('SELECT * from contact WHERE id = ?', insertId, (err, result2) => {
        error(err, res)
        const host = req.get('host')
        const location = `http://${host}/users/contacts/${insertId}`
        return res.status(201)
          .set('location', location)
          .json({ result2 })
      })
    })
  })
})

module.exports = router
