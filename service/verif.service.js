const verifyEmail = (req, res, next) => {
  const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (!emailRegEx.test(req.body.user_mail)) {
    console.log('regex')
    return res.status(401).send('Unauthorized user!')
  }
  next()
}

module.exports = { verifyEmail }
