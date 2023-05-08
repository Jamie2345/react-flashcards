const Deck = require('../models/Deck');
const User = require('../models/User');

// https://www.youtube.com/watch?v=0T4GsMYnVN4
// https://www.youtube.com/watch?v=nc-Kpiq1zLc
// https://www.youtube.com/watch?v=_ayP3rSec54

// https://www.youtube.com/watch?v=EnfsjWK0Wcs&t=3s (most helpful but not in english)

const search = (req, res, next) => {
  console.log('hello')
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.search || "flashcards";
  let sort = req.query.sort || "rating";
  let filter = req.query.filter || "Decks";

  console.log(search)

  if (filter == "Decks") {
    Deck.aggregate([
      {
        '$search': {
          'index': 'decks_language_search',
          'text': {
            'query': search,
            'path': {
              'wildcard': '*'
            }
          }
        }
      }
    ])
    .then(decks => {
      return res.json(decks);
    })
    .catch(err => {
      res.json({
        message: 'error getting decks please try again'
      })
    });
  }
  else if (filter == "users") {
    User.find({ username: { $regex: search }})
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      res.json({
        message: 'error getting users please try again'
      })
    });
  }
  else {
    res.json({
      message: "invalid filter"
    })
  }

}

module.exports = {
  // creating decks and flashcards and editing and deleting cards
  search
}
