const Deck = require('../models/Deck');

// get chat gpt to find a way to save repetition of jwt verify
const create = (req, res, next) => {
  const body = req.body;

  console.log(`body ${JSON.stringify(req.body)}`)

  Deck.findOne({creator: req.userInfo.username, name: body.name})
  .then(deckFound => {
    if (deckFound) {
      console.log('deck already exists with that name')
      res.sendStatus(409)
    }
    else {
      const deck = new Deck({
        name: body.name,
        topic: body.topic,
        creator: req.userInfo.username,
        accessLevel: body.accessLevel,
        length: 0
      })

      deck.save()

      .then(deck => {
        res.json(deck)
      })

      .catch(err => {
        res.json({
          message: 'Error saving deck'
        })
      });
    }
  })

}

const add = (req, res, next) => {
  const body = req.body;

  Deck.findOneAndUpdate(
    {name: body.deckName, creator: req.userInfo.username},
    { $push: { 'cards': req.body.card } }, // new Card() may work
    { new: true }
  )
  .then(updatedDeck => {
    console.log(updatedDeck);
    // do something with the updated deck
    updatedDeck.save()

    .then(savedDeck => {
      res.json(savedDeck);
    })
  })
  .catch(err => {
    console.error(err);
    res.json({
      error: err.message
    })
  });

}

const edit = (req, res, next) => {
  const { deckName, editedCard, cardIndex } = req.body;

  const filter = {
    name: deckName,
    creator: req.userInfo.username
  };

  const update = {
    $set: { [`cards.${cardIndex}`]: editedCard }
  };

  Deck.findOneAndUpdate(
    filter,
    update,
    { new: true }
  )
  .then(updatedDeck => {
    console.log(updatedDeck);
    // do something with the updated deck
    updatedDeck.save()
    .then(savedDeck => {
      res.json(savedDeck);
    })
  })
  .catch(err => {
    console.error(err);
    res.json({
      error: err.message
    })
  });
}

const remove = (req, res, next) => {
  const { deckName, cardIndex } = req.body;

  Deck.findOne({ name: deckName, creator: req.userInfo.username })
  .then(deck => {
    deck.cards.splice(cardIndex, 1);
    deck.save()

    .then(savedDeck => {
      res.json(savedDeck)
    });

  })
  .catch(err => {
    console.log(err);
    res.json({
      message: "error"
    })
  })
}

const decks = (req, res, next) => {
  Deck.find({ creator: req.userInfo.username })
  .then(decks => {
    return res.json(decks);
  })
  .catch(err => {
    res.json({
      message: 'error getting decks please try again'
    })
  });
}

const flashcards = (req, res, next) => {
  console.log('flashcards')
  console.log(req.headers)
  const deckId = req.query.deck
  
  Deck.findById(deckId)
  .then(foundDeck => {
    if (foundDeck) {
      res.json(foundDeck);
    }
    else {
      res.sendStatus(404)
    }
  })
  .catch(err => {
    if (err.name === 'CastError') { // check if deckId is invalid
      res.sendStatus(404)
    } else {
      res.status(500)
      res.json({
        message: 'error getting deck'
      })
    }
  })
}





module.exports = {
  // creating decks and flashcards and editing and deleting cards
  create,
  add,
  edit,
  remove,

  // getting decks and flashcards
  decks,
  flashcards
}
