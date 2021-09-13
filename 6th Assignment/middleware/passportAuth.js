
module.exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/user/login')
}

module.exports.checNotkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/user')
  }
  next()
}
