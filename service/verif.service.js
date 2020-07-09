const verifyEmail = (req, res, next) => {
  const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (!emailRegEx.test(req.body.user_mail)) {
    console.log('regex')
    return res.status(401).send('Unauthorized user!')
  }
  next()
}
const verif = (req, res, next) => {
  const token = req.body.token
  const decoded = jwt.verify(token, 'mySecretSalt')
  console.log(decoded)
  
  next()
}

module.exports = { verifyEmail, verif }