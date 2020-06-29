const express = require('express')
const router = express.Router()
const connection = require('../conf')

router.post('/', (req, res) => {
  const formData = req.body
  res.send('Register')
  console.log(formData)

  connection.query('INSERT INTO user SET ?', formData, (err, results) => {
    if (err) {
      res.status(400).send('An error is occured when created a new member' + err)
    } else {
      console.log('req ok')
      res.status(201).send('New family user created')
    }
  })
})

module.exports = router
