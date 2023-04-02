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
const FriendsRoute = require('./routes/friends')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to mongoose database'))

const SAMPLE_FLASHCARDS = [
  {"question": "What does 'por lo tanto' mean?", "answer": "Therefore"},  
  {"question": "What does 'a menudo' mean?", "answer": "Often"},  
  {"question": "What does 'en lugar de' mean?", "answer": "Instead of"},  
  {"question": "What does 'por supuesto' mean?", "answer": "Of course"},  
  {"question": "What does 'en resumen' mean?", "answer": "In summary"},  
  {"question": "What does 'de hecho' mean?", "answer": "In fact"},  
  {"question": "What does 'a pesar de' mean?", "answer": "Despite"},  
  {"question": "What does 'además' mean?", "answer": "Furthermore"},  
  {"question": "What does 'en vez de' mean?", "answer": "Instead of"},  
  {"question": "What does 'de repente' mean?", "answer": "Suddenly"},  
  {"question": "What does 'sin embargo' mean?", "answer": "However"},  
  {"question": "What does 'al principio' mean?", "answer": "At first"},  
  {"question": "What does 'en otras palabras' mean?", "answer": "In other words"},  
  {"question": "What does 'aunque' mean?", "answer": "Although"},  
  {"question": "What does 'por lo general' mean?", "answer": "Generally"},  
  {"question": "What does 'en consecuencia' mean?", "answer": "Consequently"},  
  {"question": "What does 'de hecho' mean?", "answer": "In fact"},  
  {"question": "What does 'en cualquier caso' mean?", "answer": "In any case"},  
  {"question": "What does 'de todas maneras' mean?", "answer": "Anyway"},  
  {"question": "What does 'aunque sea' mean?", "answer": "Even if it's"},
  {
    question: 'How would you say "I am a programmer" in spanish',
    answer: 'Soy programador',
  },
  {
    question: 'How would you ask someone to repeat something in Spanish',
    answer: '¿Podrías repetirlo, por favor?',
  }
]

app.get('/api/sample', (req, res) => {
  console.log('sample')
  console.log(req.headers)
  res.json(SAMPLE_FLASHCARDS)
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})

app.use('/api', AuthRoute)
app.use('/api', authenticate, CardsRoute)
app.use('/api', authenticate, FriendsRoute)