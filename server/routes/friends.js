const express = require('express')
const router = express.Router()

const FriendController = require('../controllers/FriendController')

router.post('/request', FriendController.request)

module.exports = router