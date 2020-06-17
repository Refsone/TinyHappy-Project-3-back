const cors = require('cors')
const express = require('express')
const app = express()
const connexion = require('./conf.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors('*'))

// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   next()
// })

app.get('/family/:id', (req, res) => {
  connexion.query('SELECT family_member.id, family_firstname, color FROM family_member JOIN user ON user.id = family_member.user_id JOIN color_family ON color_family.id = color_family_id WHERE user.id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.send(err)
    }res.status(200).json(results)
  })
})
app.post('/moments', (req, res) => {
  console.log(req.body)
  connexion.query('INSERT INTO moment (moment_text, moment_context, moment_event_date) SET ? WHERE moment.user_id = ?', [req.body], (err, results) => {
    if (err) {
      res.status(500).send('Erreur dans le post d\'un moment')
    } else {
      res.status(200)
    }
  })
})

app.listen(7500, () => {
  console.log('server is listening on port 7500')
})
