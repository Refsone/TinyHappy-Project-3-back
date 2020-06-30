require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(cors('*'))

app.use('/colors', routes.colors)
app.use('/families', routes.families)
app.use('/moments', routes.moments)
app.use('/users', routes.users)

app.post('/share', (req, res) => {

  const mailOutput = `
  You have an email
  ${req.body}
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
  });

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"TinyHappy 👻" <auxence_6033@hotmail.fr', // sender address
    to: 'auxence.blondel@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: mailOutput, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
