const express = require('express')
const router = express.Router()

const FlashcardsConroller = require('../controllers/FlashcardsController')

// manage flashcards and decks
router.post('/create', FlashcardsConroller.create)
router.post('/add', FlashcardsConroller.add)
router.post('/edit', FlashcardsConroller.edit)
router.post('/remove', FlashcardsConroller.remove)

// get flashcards and decks
router.get('/decks', FlashcardsConroller.decks)
router.get('/flashcards', FlashcardsConroller.flashcards)

module.exports = router