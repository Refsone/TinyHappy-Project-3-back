const express = require('express')

const { connection } = require('../conf')
const router = express.Router()
const { verifyToken } = require('../services/verif.service')

router.put('/', verifyToken, (req, res) => {
  connection.query('UPDATE moment SET moment_favorite = ? WHERE moment.id = ?', [req.body.moment_favorite, req.body.id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la modification du moment')
    } else {
      res.sendStatus(200)
    }
  })
})

router.post('/create', verifyToken, (req, res) => {
  const dataMoment = req.body
  const idFamilyMember = req.body.family_id
  delete dataMoment.family_id
  connection.query('INSERT INTO moment SET ?', [dataMoment], (err, results) => {
    if (err) {
      res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    } else {
      const sql = 'INSERT INTO family_moment VALUES ?'
      const sqlValues = []
      if (idFamilyMember.length > 0) {
        idFamilyMember.map(id => {
          sqlValues.push([id, results.insertId])
        })
      } else {
        sqlValues.push([parseInt(dataMoment.user_id), results.insertId])
      }
      connection.query(sql, [sqlValues], (err, results) => {
        if (err) {
          res.status(500).json({
            message: err.message,
            sql: err.sql
          })
        } else {
          res.sendStatus(201)
        }
      })
    }
  })
})

router.put('/modify', verifyToken, (req, res) => {
  const { moment_id, family_id, ...dataMoment } = req.body
  const idFamilyMember = family_id

  connection.query('UPDATE moment SET ? WHERE id = ?', [dataMoment, moment_id], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
        sql: err.sql
      })
    }
    connection.query('DELETE FROM family_moment WHERE moment_id = ?', moment_id, (err, result) => {
      if (err) {
        return res.status(500).json({
          message: err.message,
          sql: err.sql
        })
      }
      const sql = 'INSERT INTO family_moment VALUES ?'
      const sqlValues = []
      if (idFamilyMember.length > 0) {
        idFamilyMember.map(id => {
          sqlValues.push([id, moment_id])
        })
      } else {
        sqlValues.push([parseInt(dataMoment.user_id), moment_id])
      }
      connection.query(sql, [sqlValues], (err, results) => {
        if (err) {
          console.log(err)
          res.status(500).json({
            message: err.message,
            sql: err.sql
          })
        } else {
          res.sendStatus(200)
        }
      })
    })
  })
})

module.exports = router
