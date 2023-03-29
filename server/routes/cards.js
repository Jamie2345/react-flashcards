const express = require('express')
const router = express.Router()

const FlashcardsConroller = require('../controllers/FlashcardsController')

router.post('/create', FlashcardsConroller.create)
router.post('/add', FlashcardsConroller.add)
router.post('/edit', FlashcardsConroller.edit)
router.post('/remove', FlashcardsConroller.remove)

module.exports = router