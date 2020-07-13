const express = require('express')
const router = express.Router()
const { connection } = require('../conf')
const SchemaValidator = require('../schemaValidator')

const validateRequest = SchemaValidator(true)
const { verifyToken } = require('../service/verif.service')

// Add a new contact
router.post('/new', verifyToken, validateRequest, (req, res) => {
  const { mail, user_id } = req.body
  connection.query('INSERT INTO contact SET ?', { mail: mail }, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    const idsToInsert = {
      contact_id: result.insertId,
      user_id: user_id
    }
    connection.query('INSERT INTO user_contact SET ?', idsToInsert, (err, result2) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          sql: err.sql
        })
      }
      connection.query('SELECT * from contact WHERE id = ?', result.insertId, (err, result2) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
            sql: err.sql
          })
        }
        const host = req.get('host')
        const location = `http://${host}/users/contacts/${result.insertId}`
        return res.status(201)
          .set('location', location)
          .json({ result2 })
      })
    })
  })
})

// Delete a contact
router.delete('/:id', verifyToken, (req, res) => {
  const id = req.params.id
  connection.query('DELETE FROM contact WHERE id = ?', id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    return res.status(200).json({
      message: `Le membre ayant l'id ${id} a bien été supprimé`
    })
  })
})

module.exports = router
