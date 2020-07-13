const express = require('express')
const router = express.Router()
const transporter = require('../../service/mailTransporter')

const frontUrl = process.env.URL_FRONT

router.post('/', (req, res) => {
  const { name, user_mail, tempPassword, timeExp } = req.body

  const message =
    `
    <p>Hello ${name}</p>
    <p>Vous avez perdu votre mot de passe ?</p>
    <p>Connectez-vous de nouveau avec ce mot de passe temporaire dans les ${timeExp / 60000} prochaines minutes.</p>
    <p><strong>${tempPassword}</strong></p>
    <p>Vous devrez le modifier une fois connectée.</p>
    <a href=${frontUrl}/onboarding/login><strong>ME CONNECTER</strong></a>
    <p>Si vous n'êtes pas à l'origine de ce changement de mot de passe, merci de nous contacter directement à l'adresse hello@tinyhappy.app.</p>
    <p>Jérôme de Tinyhappy</p>
    `

  const mailOptions = {
    from: `"Jérôme de TinyHappy" ${process.env.MAIL}`,
    to: user_mail,
    subject: 'Réinitialiser votre mot de passe 🔑',
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
