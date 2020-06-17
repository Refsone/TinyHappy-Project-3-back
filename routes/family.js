const express = require('express')
const router = express.Router()
// const connection = require('../conf')

router.post('/', (req, res) => {
  const { userId, firstname, lastname, birthday, color } = req.body
  console.log(userId, firstname, lastname, birthday, color)
})

module.exports = router
