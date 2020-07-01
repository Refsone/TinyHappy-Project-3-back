const express = require('express')
const nodemailer = require('nodemailer')
const { response } = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  // console.log(req.body[0].moment_text)
  const mailOutput = `
  You have an email
  ${req.body}
  `
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL, // generated ethereal user
      pass: process.env.MAIL_PASS // generated ethereal password
    }
  })

  // send mail with defined transport object
  const info = transporter.sendMail({
    from: '"TinyHappy 👻" <auxence_6033@hotmail.fr', // sender address
    to: 'auxence.blondel@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: mailOutput // html body
  },(err, info) => {
    if(err){
      console.log(err)
    }else {
      console.log(info.response)
    }
  })

})

module.exports = router
