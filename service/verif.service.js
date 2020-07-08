const jwt = require('jsonwebtoken')
const { secret } = require('../conf')

const verifyEmail = (req, res, next) => {
  const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (!emailRegEx.test(req.body.user_mail)) {
    console.log('regex')
    return res.status(401).send('Unauthorized user!')
  }
  next()
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  console.log(req.headers.authorization)
  if (typeof authHeader !== 'undefined') {
    const tokenTH = authHeader.split(' ')[1]
    jwt.verify(tokenTH, secret, (err) => {
      if (err) {
        return res.status(403).json(err)
      }
      next()
    })
  } else {
    return res.status(400).send('No token provided')
  }
}

module.exports = { verifyEmail, verifyToken }
