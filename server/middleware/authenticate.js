const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.user = decode
    next()

  }
  catch(error) {
    res.clearCookie("token")
    return res.redirect("/welcome")
  }
}

module.exports = authenticate