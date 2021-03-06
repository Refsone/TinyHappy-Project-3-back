const mailjet = require('node-mailjet')
  .connect(process.env.MAILJET_AUTH1, process.env.MAILJET_AUTH2)

const sendTempPassword = (req, res, next) => {
  const { name, user_mail, tempPassword, timeExp } = req.body
  // Define the message to send
  let message = `Hello ${name},<br /><br />`
  message += 'Vous avez perdu votre mot de passe ?<br />'
  message += `Connectez-vous de nouveau avec ce mot de passe temporaire dans les ${timeExp / 60000} prochaines minutes.<br /><br />`
  message += `<b>${tempPassword}</b><br /><br />`
  message += 'Vous devrez le modifier une fois connectée.<br /><br />'
  message += '<a href=\'http://localhost:3000/onboarding/resetpwd\' title=\'Reset your password\'>Click here to reset your password</a><br /><br />'
  message += 'Si vous n\'êtes pas à l\'origine de ce changement de mot de passe, merci de nous contacter directement à l\'adresse hello@tinyhappy.app.'
  message += '<br /><br />Jérôme de Tinyhappy'
  // define headers of the mail and send it
  mailjet.post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'jerome.potie@gmail.com',
            Name: 'Jérôme'
          },
          To: [
            {
              Email: user_mail,
              Name: name
            }
          ],
          Subject: 'Réinitialiser votre mot de passe 🔑',
          TextPart: 'Custom password to reconnect',
          HTMLPart: `${message}`
        }
      ]
    })
    .catch(err => res.sendStatus(400).json({ err }))
    .then(() => {
      next()
    })
}
module.exports = { sendTempPassword }
