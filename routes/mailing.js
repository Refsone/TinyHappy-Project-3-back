const express = require('express')
const router = express.Router()

const { verifyEmail, verifyIfEmailExist } = require('../service/verif.service')
const sendTempPasswordByMail = require('../service/sendMailByMailJet')

router.post('/tempPassword', verifyEmail, verifyIfEmailExist, sendTempPasswordByMail, (req, res) => {
  console.log('mail is send !')
  return res.status(200).send('The new password is send')
})

module.exports = router
