const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/logout', (req, res) => {
  res.clearCookie('token')
  res.redirect('/welcome')
})

module.exports = router