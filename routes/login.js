const express = require('express')
const router = express.Router()

router.post('/users/login', (req, res) => {
  const formData = req.body
  res.send('Register')
  console.log(formData)
})

module.exports = router
