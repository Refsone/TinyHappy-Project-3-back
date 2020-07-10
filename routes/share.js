const express = require('express')
const hbs = require('nodemailer-express-handlebars')
const Moment = require('moment')
const path = require('path')
require('moment/locale/fr')
const nodemailer = require('nodemailer')
const router = express.Router()
const { verifyToken } = require('../service/verif.service')

router.post('/', verifyToken, (req, res) => {
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
  const lenghtOtherNames = req.body.authorsSelect.length
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
    viewEngine: { layoutsDir: './views', engine: 'express-handlebars', defaultLayout: false },

    viewPath: path.resolve(__dirname, '../views')
  }))

  const mailOptions = {
    from: `"${req.body.userName} via TinyHappy" <auxence_6033@hotmail.fr`,
    to: req.body.selectedMail.join(', '),
    subject: `${req.body.userName} vous partage tous ses meilleurs Moments !`,
    template: 'moments',
    context: {
      userName: req.body.userName,
      lastOtherNames: req.body.authorsSelect[lenghtOtherNames - 1],
      otherNames: req.body.authorsSelect.splice(0, lenghtOtherNames - 1),
      moments: momentsData
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
