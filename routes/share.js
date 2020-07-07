const express = require('express')
const hbs = require('nodemailer-express-handlebars')
const Moment = require('moment')
require('moment/locale/fr')
const nodemailer = require('nodemailer')
const router = express.Router()

router.post('/', (req, res) => {
  Moment.locale('fr')
  const momentsData = req.body.map(moment => {
    moment.moment_event_date = Moment(moment.moment_event_date).format('LL')
    if (moment.type === 'milestone') {
      delete moment.type
    }
    return moment
  })
  console.log(momentsData)

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
      userName: 'Jérôme',
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
