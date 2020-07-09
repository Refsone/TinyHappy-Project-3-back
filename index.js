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
app.use('/moments', routes.moments)
app.use('/share', routes.share)
app.use('/sign-up', routes.signUp)
app.use('/users', routes.users)
app.use('/modify-password', routes.modifyPassword)

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
