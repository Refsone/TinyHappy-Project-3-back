const express = require('express')
const hbs = require('nodemailer-express-handlebars')
const nodemailer = require('nodemailer')
const router = express.Router()

router.post('/', (req, res) => {
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

  transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views'
  }))

  const mailOptions = {
    from: '"TinyHappy 💙" <auxence_6033@hotmail.fr',
    to: 'auxence.blondel@gmail.com',
    subject: 'Nouveaux moments!',
    // html: mailOutput,
    template: 'moments',
    context: {
      moment: req.body
    }
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      res.status(500).send(`Erreur: ${err}`)
    } else {
      res.status(200).send('Le mail a bien été envoyé')
    }
  })
})

module.exports = router
