const express = require('express')
const router = express.Router()
const connection = require('../conf')

router.get('/', (req, res) => {
  connection.query('SELECT * FROM color_family LIMIT 8', (err, results) => {
    if (err) {
      res.status(500).send('Not found')
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
