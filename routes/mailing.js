const express = require('express')
const router = express.Router()

const { verifyEmail, verifyIfEmailExist } = require('../service/verif.service')
const { createTempPassword, addTempPassword } = require('../service/create.service')
const { sendTempPassword } = require('../service/sendMailByMailJet')

router.post('/tempPassword', verifyEmail, verifyIfEmailExist, createTempPassword, addTempPassword, sendTempPassword, (req, res) => {
  return res.status(200).send('The new password is send')
})

module.exports = router
