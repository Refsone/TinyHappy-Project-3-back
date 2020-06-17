const express = require('express')
const router = express.Router()
const connection = require('../conf')
const SchemaValidator = require('../schemaValidator')

// We are using the formatted Joi Validation error
// Pass false as argument to use a generic error
const validateRequest = SchemaValidator(true)

router.post('/', validateRequest, (req, res) => {
  const formData = req.body

  connection.query('INSERT INTO family_member SET ?', formData, (err, results) => {
    if (err) {
      res.status(400).send('An error is occured when created a new member')
    } else {
      console.log('req ok')
      res.status(201).send('New family user created')
    }
  })
})
module.exports = router
