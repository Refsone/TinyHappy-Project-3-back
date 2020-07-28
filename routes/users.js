const express = require('express')

const { connection } = require('../conf')
const router = express.Router()
const bcrypt = require('bcryptjs')

const SchemaValidator = require('../schemaValidator')
const validateRequest = SchemaValidator(true)
const { verifyToken, verifyDuplicateMail } = require('../services/verif.service')

router.get('/', verifyToken, (req, res) => {
  connection.query('SELECT user_mail, user_password FROM user', (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur')
    } else {
      res.json(results)
    }
  })
})

router.get('/tempPwd/', (req, res) => {
  const { mail } = req.query
  // Verify if the mail exist on the database
  connection.query('SELECT user_temp_password, temp_password_limit FROM user WHERE user_mail = ?', mail, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    } else if (!result[0]) {
      return res.status(404).json({
        message: 'The email does not exist'
      })
    }
    // Verify is the temporary password match with bdd password
    bcrypt.compare(req.query.tempPwd, result[0].user_temp_password, (err, ok) => {
      if (err) {
        return res.status(500).send('Error when compare the password')
      }
      if (ok) {
        const date = new Date().getTime()
        // Verify if the temp password is still available
        if (result[0].temp_password_limit < date) {
          return res.status(403).send('The limit of the temporary password is over')
        }
        return res.status(200).send('Temporary password is valid')
      }
      return res.status(404).send('Temporary password is not valid')
    })
  })
})

router.get('/:id', verifyToken, (req, res) => {
  connection.query('SELECT user.id, user_firstname, user_lastname, user_firstname, user_birthday, color_family_id, color FROM user JOIN color_family ON color_family.id=user.color_family_id WHERE user.id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération de l\'utilisateur')
    } else {
      res.json(results)
    }
  })
})

router.get('/:id/family', verifyToken, (req, res) => {
  connection.query('SELECT fa.id AS member_id, family_firstname, family_lastname, family_surname, family_birthday, color FROM family_member fa JOIN color_family ON color_family.id=fa.color_family_id WHERE fa.user_id = ?', [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des membres de la famille')
    } else {
      res.json(results)
    }
  })
})

router.get('/:user_id/family-members/:member_id', verifyToken, (req, res) => {
  connection.query('SELECT id, family_firstname, family_lastname, family_surname, family_birthday, color_family_id FROM family_member WHERE id = ?', [req.params.member_id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    return res.json(results)
  })
})

router.get('/:id/moments', verifyToken, (req, res) => {
  const sql = `
  SELECT moment.id AS momentId, moment_text, moment_context, moment_favorite, moment_event_date, family_firstname, type, user_isPresent, color, fme.id FROM moment
  LEFT JOIN family_moment ON moment_id=moment.id
  LEFT JOIN family_member fme ON family_member_id=fme.id
  LEFT JOIN color_family ON color_family_id=color_family.id
  JOIN moment_type ON moment.moment_type_id=moment_type.id
  WHERE moment.user_id = ?
  GROUP BY moment.id, fme.id
  ORDER BY moment_event_date DESC, moment.id DESC
  `
  connection.query(sql, [req.params.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des moments')
    } else {
      let prevText = ''
      let prevName = []
      const idToDrop = []
      const moments = results
        .map((moment, id) => {
          const familyFirstname = { firstname: moment.family_firstname, color: moment.color, id: moment.id }
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
        .filter((elt, id) => idToDrop.indexOf(id) === -1)
      res.json(moments)
    }
  })
})

router.get('/:user_id/contacts', verifyToken, (req, res) => {
  let sql = 'SELECT ctc.id, ctc.mail from contact ctc'
  sql += ' JOIN user_contact us ON us.contact_id = ctc.id'
  sql += ' WHERE us.user_id = ? '

  connection.query(sql, req.params.user_id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    res.status(200).json({ result })
  })
})

router.put('/update', verifyToken, validateRequest, (req, res) => {
  const formdata = req.body
  const id = req.body.id
  connection.query('UPDATE user SET ? WHERE id = ?', [formdata, id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    connection.query('SELECT * from user WHERE id = ?', id, (err2, result2) => {
      if (err2) {
        return res.status(500).json({
          message: err2.message,
          sql: err2.sql
        })
      }
      const { user_password, user_mail, user_temp_password, ...dataUser } = result2[0]

      const host = req.get('host')
      const location = `http://${host}/users/family-members/${id}`

      if (dataUser.user_birthday) {
        const { user_birthday, ...user } = dataUser
        const tempDate = user_birthday.toLocaleDateString('fr-FR').split('-').reverse().join('/')
        user.user_birthday = tempDate
        return res.status(200)
          .set('location', location)
          .json({ user })
      } else {
        return res.status(200)
          .set('location', location)
          .json({ dataUser })
      }
    })
  })
})

router.put('/modify-password', verifyToken, (req, res) => {
  const id = req.user.id
  const newPassword = req.body.newPassword
  const userPassword = req.body.actualPassword
  connection.query('SELECT user_password FROM user WHERE id = ?', id, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    if (bcrypt.compareSync(userPassword, result[0].user_password)) {
      const hashNewPassword = bcrypt.hashSync(newPassword)
      connection.query('UPDATE user SET user_password = ? WHERE id = ?', [hashNewPassword, id], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
            sql: err.sql
          })
        } else {
          res.sendStatus(201)
        }
      })
    } else {
      res.sendStatus(401)
    }
  }
  )
})

router.get('/:user_id/parameter', verifyToken, (req, res) => {
  connection.query('SELECT display_birthday FROM parameter WHERE parameter.user_id = ?', [req.params.user_id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la recherche du user')
    } else {
      res.json(results)
    }
  })
})

router.put('/:id/modify-email', verifyToken, verifyDuplicateMail, (req, res) => {
  const id = req.params.id
  const newEmail = req.body.new_user_mail
  connection.query('SELECT user_mail FROM user WHERE id = ?', [id, newEmail], (err, result) => {
    if (err) {
      return res.handleServerError(err)
    } else {
      connection.query('UPDATE user SET user_mail = ? WHERE id = ?', [newEmail, id], (err, result) => {
        if (err) {
          return res.status(500).json({
            message: err.message,
            sql: err.sql
          })
        } else {
          res.status(200).send('Email changed')
        }
      })
    }
  })
})

module.exports = router
