const { connection } = require('../conf')
const express = require('express')
const router = express.Router()
const { verifyToken } = require('../services/verif.service')

router.get('/', verifyToken, (req, res) => {
  connection.query('SELECT * FROM color_family LIMIT 8', (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
