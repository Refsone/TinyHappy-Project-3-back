const express = require('express')
const router = express.Router()
const transporter = require('../../service/mailTransporter')

router.post('/', (req, res) => {

  const message =
    `
    
    `

  const mailOptions = {
    from: `"${req.body.userName} via TinyHappy" ${process.env.MAIL}`,
    to: req.body.selectedMail.join(', '),
    subject: `${req.body.userName} vous partage tous ses meilleurs Moments !`
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
