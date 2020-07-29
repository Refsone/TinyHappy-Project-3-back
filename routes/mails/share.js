const express = require('express')
const hbs = require('nodemailer-express-handlebars')
const Moment = require('moment')
require('moment/locale/fr')
const path = require('path')
const router = express.Router()
const transporter = require('../../services/mailTransporter')

router.post('/', (req, res) => {
  Moment.locale('fr')

  // convert date and delete milestone for verification into .handlebars
  const momentsData = req.body.momentsToSend.map(moment => {
    moment.moment_event_date = Moment(moment.moment_event_date).format('LL')
    if (moment.type === 'milestone') {
      delete moment.type
    }
    return moment
  })
  const lenghtOtherNames = req.body.authorsSelect.length

  transporter.use('compile', hbs({
    viewEngine: { layoutsDir: './views', engine: 'express-handlebars', defaultLayout: false },

    viewPath: path.resolve(__dirname, '../../views')
  }))

  const mailOptions = {
    from: `"${req.body.userName} via TinyHappy" <${process.env.MAIL}>`,
    to: req.body.selectedMail.join(', '),
    subject: `${req.body.userName} vous partage tous ses meilleurs Moments ! 🤩`,
    template: 'moments',
    context: {
      userName: req.body.userName,
      userColor: req.body.userColor,
      lastOtherNames: req.body.authorsSelect[lenghtOtherNames - 1],
      otherNames: req.body.authorsSelect.splice(0, lenghtOtherNames - 1),
      moments: momentsData
    }
  }

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      res.status(500).send(`Erreur: ${err}`)
    } else {
      res.status(200).send('Le mail a bien été envoyé')
    }
  })
})

module.exports = router
