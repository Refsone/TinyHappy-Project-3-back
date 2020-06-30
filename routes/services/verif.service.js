const verifyEmail = (req, res, next) => {
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!emailRegEx.test(req.body.userMail)) {
    return res.status(401).send('Unauthorized user!')
  }

  next()
}

module.exports = { verifyEmail }
