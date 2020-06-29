const express = require('express')
const router = express.Router()
const connection = require('../conf')

router.post('/', (req, res) => {
  const formData = req.body

  const getUser = (userMail) => {
    connection.query('INSERT INTO user SET ?', formData, [userMail], (err, results) => {
      if (err) {
        res.status(400).send('Error while connecting to DB' + err)
      } else {
        console.log('req is ok')
        res.status(201).send('You are connected')
      }
    })
  }
})

module.exports = router
