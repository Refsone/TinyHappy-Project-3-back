const express = require('express')

const { connection } = require('../conf')
const router = express.Router()
const { verifyToken } = require('../service/verif.service')

router.put('/display-birthday', verifyToken, (req, res) => {
  connection.query('UPDATE parameter SET display_birthday = ? WHERE parameter.user_id = ?', [req.body.display_birthday, req.body.user_id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de l\'affichage de l\'anniversaire de l\'utilisateur')
    } else {
      res.json(results)
    }
  })
})

module.exports = router
