const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()

router.post('/', (req, res) => {
  console.log(req.body)
  let mailOutput = `
  Hey, vous avez reçu plein de moments !!
  `
  req.body.map(moment => {
    const message =
    '<p>Auteurs : ' + moment.firstname_color.map(person => person.firstname) + '</p>' +
    '<p>Texte : ' + moment.moment_text + '</p>' +
    '<br>'
    mailOutput += message
    return mailOutput
  })
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
    from: '"TinyHappy 💙" <auxence_6033@hotmail.fr',
    to: 'auxence.blondel@gmail.com',
    subject: 'Nouveaux moments!',
    text: 'Hello world?',
    html: mailOutput
  })
})
module.exports = router
