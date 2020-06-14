require('dotenv').config()
const express = require('express')
const app = express()
// const connection = require('./conf')

// Support JSON-encoded bodies
app.use(express.json())
// Support URL-encoded bodies
app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => {
  res.send('First get')
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
