const express = require('express')
const router = express.Router()
const transporter = require('../../services/mailTransporter')

router.post('/', (req, res) => {
  const message =
    `
    <p>Hello ${req.body.user_firstname}</p>
    <p>Bienvenue sur Tinyhappy !</p>
    <p>Nous sommes absolument ravis de vous avoir à bord !</p>
    <p>Grâce à Tinyhappy, vous pouvez à tout instant : </p>
    <ul>
      <li>créer de nouveaux membres de votre famille</li>
      <li>sauvegarder les citations et les faits marquants de vos enfants</li>
      <li>partager tous ces moments avec vos proches (par mail)</li>
    </ul>
    <p>Ne perdez plus un instant, votre journal de famille n'attend plus que vous !</p>
    <p>Jérôme de Tinyhappy</p>
    `

  const mailOptions = {
    from: `"Jérôme de TinyHappy" <${process.env.MAIL}>`,
    to: req.body.user_mail,
    subject: 'Bienvenue sur Tinyhappy ! 👋',
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
