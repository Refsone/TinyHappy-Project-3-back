const express = require('express')

const router = express.Router()
const connection = require('../conf.js')

router.get('/:id', (req, res) => {
  connection.query('SELECT family_member.id, family_firstname, color FROM family_member JOIN user ON user.id = family_member.user_id JOIN color_family ON color_family.id = color_family_id WHERE user.id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.send(err)
    } res.status(200).json(results)
  })
})

module.exports = router
