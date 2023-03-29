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
    { $push: { 'cards': req.body.card } },
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

  const deck = Deck.findOne({ name: deckName, creator: req.userInfo.username })
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




module.exports = {
  create,
  add,
  edit,
  remove
}
