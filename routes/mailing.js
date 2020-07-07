const express = require('express')
const router = express.Router()

const { verifyEmail, verifyIfEmailExist } = require('../service/verif.service')
const { createTempPassword } = require('../service/create.service')
const { sendTempPassword } = require('../service/sendMailByMailJet')

router.post('/tempPassword', verifyEmail, verifyIfEmailExist, createTempPassword, sendTempPassword, (req, res) => {
  console.log(req.body.tempPassword)
})

module.exports = router
