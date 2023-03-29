const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

const LogoutController = require('../controllers/LogoutController')

const refreshTokenController = require('../controllers/RefreshTokenController')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.get('/logout', LogoutController.handleLogout)

router.get('/refresh', refreshTokenController.handleRefreshToken)

module.exports = router