const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

router.post('/', (req, res) => {
  const mailOutput = `
  You have an email
  ${req.body}
  `

  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL,
      pass: process.env.MAIL_PASS
    }
  })

  transporter.sendMail({
    from: '"TinyHappy 👻" <auxence_6033@hotmail.fr',
    to: 'auxence.blondel@gmail.com',
    subject: 'Hello ✔',
    text: 'Hello world?',
    html: mailOutput
  }, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info.response)
    }
  })
})
module.exports = router
