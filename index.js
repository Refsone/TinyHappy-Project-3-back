require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()

const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors('*'))

app.use('/colors', routes.colors)
app.use('/contacts', routes.contacts)
app.use('/family-members', routes.familyMembers)
app.use('/mailing', routes.mailing)
app.use('/moments', routes.moments)
app.use('/send-mails', routes.sendMail)
app.use('/sign-up', routes.signUp)
app.use('/users', routes.users)
app.use('/users/login', routes.login)

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
