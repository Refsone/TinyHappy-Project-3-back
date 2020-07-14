const express = require('express')
const mailRouter = express.Router()
const mailRoutes = require('./mails/mailsIndex')

const { verifyEmail, verifyIfEmailExist } = require('../services/verif.service')
const { createTempPassword, addTempPassword } = require('../services/create.service')

mailRouter.use('/lost-pwd', verifyEmail, verifyIfEmailExist, createTempPassword, addTempPassword, mailRoutes.lostPwd)
mailRouter.use('/new-pwd', mailRoutes.newPwd)
mailRouter.use('/new-mail', mailRoutes.newMail)
mailRouter.use('/register', mailRoutes.register)
mailRouter.use('/share', mailRoutes.share)

module.exports = mailRouter
