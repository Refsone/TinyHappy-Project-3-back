const express = require('express')
const router = express.Router()
const connection = require('../conf')

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM family_member'
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(404).send('Ressources not found')
    } else {
      return res.status(200).json(results)
    }
  })
})

module.exports = router
