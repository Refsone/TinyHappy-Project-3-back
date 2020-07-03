const verifyEmail = (req, res, next) => {
  console.log(req.body)
  const emailRegEx = /^([a-zA-Z0-9-.]+)@([a-zA-Z0-9-.]+).([a-zA-Z]{2,5})$/
  if (!emailRegEx.test(req.body.user_mail)) {
    return res.status(401).send('Unauthorized user')
  }

  next()
}

module.exports = { verifyEmail }
