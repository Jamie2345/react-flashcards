const express = require('express')
const router = express.Router()

const FriendController = require('../controllers/FriendController')

router.put('/request', FriendController.request)
router.put('/accept', FriendController.accept)

router.delete('/unfriend', FriendController.unfriend)
router.delete('/unrequest', FriendController.unrequest)

module.exports = router