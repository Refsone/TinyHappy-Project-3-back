const generator = require('generate-password')
const mailjet = require('node-mailjet')
  .connect('5ea1ae1779664c4a9937feebe7a39f35', 'b3e1969e5e19f60304edb9eeaf7d9fb3')

// Generate a custom password
const tempPassword = generator.generate({
  length: 12,
  numbers: true,
  strict: true
})

let message = 'Hello,<br /><br />'
message += 'Vous avez perdu votre mot de passe ?<br />'
message += 'Connectez - vous de nouveau avec ce mot de passe temporaire dans les XX prochaines minutes.<br />'
message += `${tempPassword}<br /><br />`
message += 'Vous devrez le modifier une fois connectée.<br /><br />'
message += 'Si vous n\'êtes pas à l\'origine de ce changement de mot de passe, merci de nous contacter directement à l\'adresse hello@tinyhappy.app.'
message += '<br /><br />Jérôme de Tinyhappy'

const sendTempPasswordByMail = () => (req, res, next) => {
  mailjet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'jerome.potie@gmail.com',
            Name: 'Jérôme'
          },
          To: [
            {
              Email: mail,
              Name: 'Jérôme' // Todo: Modify with the current user
            }
          ],
          Subject: 'Réinitialiser votre mot de passe 🔑',
          TextPart: 'Custom password to reconnect',
          HTMLPart: `${message}`
        }
      ]
    })
    .catch((err) => {
      return res.status(400).send(err.statusCode)
    })
    .then(next())
}

module.exports = sendTempPasswordByMail
