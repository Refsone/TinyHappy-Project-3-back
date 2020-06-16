require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
<<<<<<< HEAD
const routes = require('./routes/index')
=======
const connexion = require('./conf.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.get('/:id/moments/create', (req, res) => {
  connexion.query('SELECT family_member.id, family_firstname, color FROM family_member JOIN user ON user.id = family_member.user_id JOIN color_family ON color_family.id = color_family_id WHERE user.id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.send(err)
    }res.status(200).json(results)
  })
})
>>>>>>> cce4a9e... create route

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(cors('*'))

app.use('/colors', routes.colors)
app.use('/families', routes.families)
app.use('/moments', routes.moments)
app.use('/users', routes.users)
app.use('/moments', routes.moments)
app.use('/families', routes.families)
app.use('/colors', routes.colors)

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
