const express = require('express')

const connection = require('../conf')
const router = express.Router()

router.put('/', (req, res) => {
  connection.query('UPDATE moment SET moment_favorite = ? WHERE moment.id = ?', [req.body.moment_favorite, req.body.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la modification du moment')
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router
