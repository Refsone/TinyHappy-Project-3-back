const express = require('express')

const router = express.Router()
const connection = require('../conf')

router.get('/:id', (req, res) => {
  connection.query('SELECT user_firstname, user_lastname, user_birthday, color FROM user JOIN color_family ON color_family.id=user.color_family_id WHERE user.id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur')
      console.log(err)
    } else {
      res.json(results)
    }
  })
})

router.get('/:id/family', (req, res) => {
  connection.query('SELECT fa.id, family_firstname, family_lastname, family_surname, family_birthday, color FROM family_member fa JOIN color_family ON color_family.id=fa.color_family_id WHERE fa.user_id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Erreur lors de la récupération des membres de la famille')
    } else {
      res.json(results)
    }
  })
})

router.get('/:id/moments', (req, res) => {
  connection.query('SELECT moment.id, moment_text, moment_context, moment_favorite, moment_event_date, family_firstname, type, user_isPresent, color FROM moment JOIN family_moment ON moment_id=moment.id JOIN family_member fme ON family_member_id=fme.id JOIN color_family ON color_family_id=color_family.id JOIN moment_type ON moment.moment_type_id=moment_type.id WHERE moment.user_id = ? GROUP BY moment.id, fme.id ORDER BY moment_event_date DESC', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des moments')
    } else {
      let prevText = ''
      let prevName = []
      const idToDrop = []
      const moments = results.map((moment, id) => {
        const familyFirstname = { firstname: moment.family_firstname, color: moment.color }
        if (moment.moment_text === prevText) {
          idToDrop.push(id - 1)
          moment.firstname_color = prevName.concat(familyFirstname)
        } else {
          moment.firstname_color = [familyFirstname]
        }

        prevText = moment.moment_text
        prevName = moment.firstname_color
        delete moment.family_firstname
        delete moment.color

        return moment
      })

      idToDrop.map(elt => moments.splice(elt, 1))
      res.json(moments)
    }
  })
})

module.exports = router
