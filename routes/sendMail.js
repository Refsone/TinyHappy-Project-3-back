const express = require('express')
const mailRouter = express.Router()
const mailRoutes = require('./mails/mailsIndex')

mailRouter.use('/share', mailRoutes.share)

module.exports = mailRouter
