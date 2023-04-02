const User = require('../models/User');

// get chat gpt to find a way to save repetition of jwt verify
const request = (req, res, next) => {
  const { userRequesting } = req.body;

  User.findById(req.userInfo.id)
  .then(currentUser => {
    if (currentUser) {
      console.log(currentUser)
      
      // find the user to follow
      User.findOne({username: userRequesting})
      .then(userFound => {
        if (userFound) {
          console.log('user Found: ' + userFound)

          userFound.pendingFriends.incoming.push({
            userId: currentUser._id,
            name: currentUser.username
          })
          userFound.save()
          .then(savedUser => {
            res.json(savedUser)
          })
        }
        else {
          res.json({
            message: 'User does not exist'
          })
        }
      });

    }
    else {
      res.json({
        message: 'Invalid user ID'
      })
    }
  })
  .catch(err => {
    res.sendStatus(404)
  });
  
}

module.exports = {
  // creating decks and flashcards and editing and deleting cards
  request


  // request TYPE = POST
  // accept TYPE = POST

  // incoming TYPE = GET
  // outgoing TYPE = GET
}