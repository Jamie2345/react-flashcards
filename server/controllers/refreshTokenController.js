const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies)
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

  const foundUser = await User.findOne({ refreshToken }).exec();

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) return res.sendStatus(403);
        const hackedUser = await User.findOne({ username: decoded.username }).exec();
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
        console.log('hackedn')

      }
    )
    return res.sendStatus(403);
  }
  else {

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
  
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          foundUser.refreshToken = [...newRefreshTokenArray];
          const result = await foundUser.save();
        }
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
  
        // Refresh token was still valid
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: foundUser.username,
              id: foundUser._id
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10s' }
        );
  
        const newRefreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );
        
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  
        const result = await foundUser.save();
  
        res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
  
        console.log('refresh')
  
        res.json({ 
          username: foundUser.username, 
          accessToken 
        });
  
      }
    )
  }

}

module.exports = {
  handleRefreshToken
}