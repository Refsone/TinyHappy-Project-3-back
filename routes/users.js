const express = require('express')

const router = express.Router()
const connection = require('../conf')

router.get('/:id/moments', (req, res) => {
  connection.query('SELECT moment.id, moment_text, moment_context, moment_favorite, moment_event_date, family_firstname, color FROM moment JOIN family_moment ON moment_id=moment.id JOIN family_member fme ON family_member_id=fme.id JOIN color_family ON color_family_id=color_family.id WHERE moment.user_id = ? GROUP BY moment.id, fme.id', [req.params.id], (err, results) => {
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
