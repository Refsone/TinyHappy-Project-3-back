const express = require('express')
const router = express.Router()
const transporter = require('../../services/mailTransporter')

const frontUrl = process.env.URL_FRONT

router.post('/', (req, res) => {
  const message =
    `
    <p>Hello ${req.body.user_firstname}</p>
    <p>Votre adresse mail a été changé avec succès !</p>
    <p>Vous pouvez désormais vous connecter à l'aide de cette adresse.</p>
    <a href=${frontUrl}/onboarding/login><strong>ME CONNECTER</strong></a>
    <p>Si vous n'êtes pas à l'origine de ce changement de mot de passe, merci de nous contacter directement à l'adresse hello@tinyhappy.app.</p>
    <p>Jérôme de Tinyhappy</p>
    `

  const mailOptions = {
    from: `"Jérôme de TinyHappy" ${process.env.MAIL}`,
    to: req.body.user_mail,
    subject: 'Votre adresse mail a bien été modifié ✉',
    html: message
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
