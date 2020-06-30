const verifyEmail = (req, res, next) => {
  const emailRegEx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  if (!emailRegEx.test(req.body.email)) {
    return res.status(401).send('Unauthorized user')
  }

  next()
}

module.exports = { verifyEmail }
