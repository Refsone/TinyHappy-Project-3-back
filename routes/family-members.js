const express = require('express')
const router = express.Router()
const connection = require('../conf')
const SchemaValidator = require('../schemaValidator')

const validateRequest = SchemaValidator(true)

// Add a new family member
router.post('/new', validateRequest, (req, res) => {
  const formData = req.body

  connection.query('INSERT INTO family_member SET ?', formData, (err, results) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
        sql: err.sql
      })
    }
    // If no error we send the create datas to the user
    connection.query('SELECT * FROM family_member WHERE id = ?', results.insertId, (err2, results2) => {
      if (err2) {
        return res.status(400).json({
          message: err2.message,
          sql: err2.sql
        })
      }
      const host = req.get('host')
      const location = `http://${host}/users/${formData.user_id}/family-members/${results.insertId}`
      // If a birthday date exist, we format it to be more readable
      if (results2[0].family_birthday) {
        const { family_birthday, ...member } = results2[0]
        const tempDate = family_birthday.toLocaleDateString('fr-FR').split('-').reverse().join('/')
        member.family_birthday = tempDate
        return res.status(200)
          .set('location', location)
          .json({ member })
      } else {
        return res.status(200)
          .set('location', location)
          .json({ results2 })
      }
    })
  })
})

// Modify a family member
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
      const location = `http://${host}/users/${formData.user_id}/family-members/${formData.id}`

      if (results2[0].family_birthday) {
        const { family_birthday, ...member } = results2[0]
        const tempDate = family_birthday.toLocaleDateString('fr-FR').split('-').reverse().join('/')
        member.family_birthday = tempDate
        return res.status(200)
          .set('location', location)
          .json({ member })
      } else {
        return res.status(200)
          .set('location', location)
          .json({ results2 })
      }
    })
  })
})

// Delete a member
router.delete('/:id', (req, res) => {
  connection.query('DELETE from family_member WHERE id = ?', req.params.id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    return res.status(200).json({
      message: 'Le membre a bien été effacé'
    })
  })
})

module.exports = router
