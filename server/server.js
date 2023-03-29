const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const dotenv = require('dotenv')
dotenv.config()

app.use(cookieParser())

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const authenticate = require('./middleware/authenticate')

const AuthRoute = require('./routes/auth')
const CardsRoute = require('./routes/cards')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose database'))


const SAMPLE_FLASHCARDS = [
  {"id": 1, "question": "What does 'por lo tanto' mean?", "answer": "Therefore"},  
  {"id": 2, "question": "What does 'a menudo' mean?", "answer": "Often"},  
  {"id": 3, "question": "What does 'en lugar de' mean?", "answer": "Instead of"},  
  {"id": 4, "question": "What does 'por supuesto' mean?", "answer": "Of course"},  
  {"id": 5, "question": "What does 'en resumen' mean?", "answer": "In summary"},  
  {"id": 6, "question": "What does 'de hecho' mean?", "answer": "In fact"},  
  {"id": 7, "question": "What does 'a pesar de' mean?", "answer": "Despite"},  
  {"id": 8, "question": "What does 'además' mean?", "answer": "Furthermore"},  
  {"id": 9, "question": "What does 'en vez de' mean?", "answer": "Instead of"},  
  {"id": 10, "question": "What does 'de repente' mean?", "answer": "Suddenly"},  
  {"id": 11, "question": "What does 'sin embargo' mean?", "answer": "However"},  
  {"id": 12, "question": "What does 'al principio' mean?", "answer": "At first"},  
  {"id": 13, "question": "What does 'en otras palabras' mean?", "answer": "In other words"},  
  {"id": 14, "question": "What does 'aunque' mean?", "answer": "Although"},  
  {"id": 15, "question": "What does 'por lo general' mean?", "answer": "Generally"},  
  {"id": 16, "question": "What does 'en consecuencia' mean?", "answer": "Consequently"},  
  {"id": 17, "question": "What does 'de hecho' mean?", "answer": "In fact"},  
  {"id": 18, "question": "What does 'en cualquier caso' mean?", "answer": "In any case"},  
  {"id": 19, "question": "What does 'de todas maneras' mean?", "answer": "Anyway"},  
  {"id": 20, "question": "What does 'aunque sea' mean?", "answer": "Even if it's"},
  {
    id: 21,
    question: 'How would you say "I am a programmer" in spanish',
    answer: 'Soy programador',
  },
  {
    id: 22,
    question: 'How would you ask someone to repeat something in Spanish',
    answer: '¿Podrías repetirlo, por favor?',
  }
]

app.get('/api/flashcards', (req, res) => {
  console.log(req.headers)
  res.json(SAMPLE_FLASHCARDS)
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})

app.use('/api', AuthRoute)
app.use('/api', authenticate, CardsRoute)