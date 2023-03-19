const express = require('express')
const app = express()

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'How would you say "I am a programmer" in spanish',
    answer: 'Soy programador',
    active: true,
  },
  {
    id: 2,
    question: 'How would you ask someone to repeat something in Spanish',
    answer: '¿Podrías repetirlo, por favor?',
    active: false
  } 
]

app.get('/api/flashcards', (req, res) => {
  res.json(SAMPLE_FLASHCARDS)
})

app.listen(5000, () => {
  console.log('listening on port 5000')
})