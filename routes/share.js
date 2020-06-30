const express = require('express')

const router = express.Router()
// const connection = require('../conf')

router.post('/', (req, res) => {

  const mailOutput = `
    You have an email
    `
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'auxence_6033@hotmail.fr', // generated ethereal user
      pass: '.33Girondin59', // generated ethereal password
    },
  })

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"TinyHappy 👻" <auxence_6033@hotmail.fr', // sender address
    to: 'auxence.blondel@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: mailOutput, // html body
  })

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  module.exports = router
})
