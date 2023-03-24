const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
  console.log(req.body)

  bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
    if (err) {
      res.json({
        error: err
      })
    }

    // check password strength regex
    let strongPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")

    // make sure username is at least 3 characters long
    if (req.body.username.length < 3) {
      res.json({
        message: 'Username must be at least 3 characters long'
      })
    }

    // make sure password is strong enough
    else if (!strongPassword.test(req.body.password)) {
      res.json({
        message: 'Password too weak!: Must be at least 8 characters long, contain upper and lowercase letters, numbers and symbols'
      })
    }

    // if password strong enough
    else {
      // check if username already used
      User.findOne({username: req.body.username})
      .then(user => {
  
        if (user) {
          res.status(409)
          res.json({
            message: 'Username Taken'
          })
        }
        else {
          // check if contact info already registered
          User.findOne({email: req.body.email})
          .then(user => {
  
            if (user && req.body.email) {
              res.status(409)
              res.json({
                message: req.body.email + ' Is already registered'
              })
            }

            // create user if all previous tests pass
            else {
  
              let user = new User ({
                username: req.body.username,
                email: req.body.email,
                password: hashedPass,
              })
              user.save()
              .then(user => {
                res.json(user);
              })
              .catch(error => {
                res.json({
                  message: 'An error occurred'
                })
              })
  
            }
  
          })
  
        }
  
      })

    }

  })
}

const login = (req, res, next) => {
  var identifier = req.body.identifier
  var password = req.body.password

  User.findOne({$or: [{username:identifier}, {email:identifier}]})
  .then(user => {
    if (user) {
      bcrypt.compare(password, user.password, function(err, result) {

        if (err) {
          res.json({
            error: err
          })
        }

        if (result) {
          let token = jwt.sign({name: user.username, _id: user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'})
        
          res.cookie("token", token)
          res.json({
            username: user.username,
            id: user._id,
            accessToken: token
          })
        }
        
        else {
          res.json({
            message: 'Passwords do not match'
          })
        }
      })
    }
    else {
      res.json({
        message: 'User not found'
      })
    }
  })
}

module.exports = {
  register,
  login
}