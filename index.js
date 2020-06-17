const cors = require('cors')
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

app.use('/users', routes.users)
app.use('/moments', routes.moments)
app.use('/family', routes.family)

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
