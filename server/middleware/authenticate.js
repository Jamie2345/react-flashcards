const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userInfo = decode.UserInfo;
    console.log(decode)
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};


module.exports = authenticate