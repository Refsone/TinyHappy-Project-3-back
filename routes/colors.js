const express = require('express')
const router = express.Router()
const connection = require('../conf')

router.get('/', (req, res) => {
  connection.query('SELECT * FROM color_family LIMIT 8', (err, results) => {
    console.log(results)
    if (err) {
      res.status(404).send('Not found')
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
