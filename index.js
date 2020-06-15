require('dotenv').config()
const express = require('express')
const app = express()
const connection = require('./conf')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/users/:id/moments', (req, res) => {
  connection.query('SELECT moment.id, moment_text, moment_context, moment_favorite, moment_event_date, family_firstname, color FROM moment JOIN family_moment ON moment_id=moment.id JOIN family_member fme ON family_member_id=fme.id JOIN color_family ON color_family_id=color_family.id WHERE moment.user_id = ? GROUP BY moment.id, fme.id', [req.params.id], (err, results) => {
    if (err) {
      // res.status(500).send('Erreur lors de la récupération des moments')
      res.status(500).send(err)
    } else {
      res.json(results)
    }
  })
})

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log('Something bad happened...')
  } else {
    console.log(`server is listening on port ${process.env.PORT}`)
  }
})
