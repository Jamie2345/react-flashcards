const User = require('../models/User');

// function to check if the user accepting is already a friend
function inFriends(currentUser, userToAccept) {
  for (i=0; i < currentUser.friends.length; i++) {
    let friend = currentUser.friends[i];
    if (friend.name === userToAccept) {
      return true;
    }
  }
  return false
}

const request = (req, res, next) => {
  
  function alreadyRequested(currentUser, userToRequest) {
    
    // check if the user friend request is already pending
    for (i=0; i<currentUser.pendingFriends.outgoing.length; i++) {
      let pending = currentUser.pendingFriends.outgoing[i];
      
      if (pending.name === userToRequest) {
        return true;
      }
    }
    return false;
  }
  
  const { userToRequest } = req.body;

  User.findById(req.userInfo.id)
  .then(currentUser => {
    // if user not found
    if (!currentUser) {
      res.status(404).json({ message: 'Invalid user ID' });
      return;
    }

    if (inFriends(currentUser, userToRequest)) {
      res.status(409).json({ message: 'This user is already your friend' });
      return;
    }

    // check if user is already requesting
    if (alreadyRequested(currentUser, userToRequest)) {
      res.status(409).json({ message: `You have already requested to friend ${userToRequest}` });
      return;
    }

    // find the user to follow
    User.findOne({username: userToRequest})

    .then(userFound => {
    
      if (!userFound) {
        res.status(404).json({ message: 'User does not exist' });
        return;
      }

      // send the request if not already requested
      userFound.pendingFriends.incoming.push({
        userId: currentUser._id,
        name: currentUser.username
      })

      currentUser.pendingFriends.outgoing.push({
        userId: userFound._id,
        name: userFound.username
      })

      // save the new pending friends objects to the database
      Promise.all([userFound.save(), currentUser.save()])
      .then(() => {
        res.json({
          message: 'You have successfully sent a friend request'
        });
      })
      .catch(err => {
        res.json({
          message: 'unexpected error sending friend request'
        });
      });
    });
  })

  .catch(err => {
    console.log(err);
    res.sendStatus(404)
  });

}

const accept = (req, res, next) => {
  
  // function to check if there is an incoming friend request from the person to accept one from
  function inIncoming(currentUser, userToAccept) {
    const incomingFriends = currentUser.pendingFriends.incoming;
    console.log(incomingFriends)
    for (i=0; i < incomingFriends.length; i++) {
      let incomingFriend = incomingFriends[i];
      if (incomingFriend.name === userToAccept) {
        return true;
      }
    }
    return false
  }

  const { acceptUser } = req.body;

  User.findById(req.userInfo.id) // req.userInfo.id is the id of the user making the request (.userInfo is created in a middleware function)
  .then(currentUser => {

    // check if currentUser is found, then make sure not already friends and that a request has been sent already

    if (!currentUser) {
      res.status(404).json({ message: 'Invalid user ID' });
      return;
    }

    if (inFriends(currentUser, acceptUser)) {
      res.status(409).json({ message: 'This user is already your friend' });
      return;
    }

    if (!inIncoming(currentUser, acceptUser)) {
      res.status(404).json({ message: 'This user has not sent you a friend request' });
      return;
    }

    // find the user to accept
    User.findOne({username: acceptUser})
    .then(userFound => {

      if (!userFound) {
        res.status(404).json({ message: 'User does not exist' });
        return;
      }

      // add to the friends list of the user
      userFound.friends.push({
        userId: currentUser._id,
        name: currentUser.username
      })

      // remove all the the pending requests now accepted
      userFound.pendingFriends.outgoing = userFound.pendingFriends.outgoing.filter(obj => obj.name !== currentUser.username);

      currentUser.friends.push({
        userId: userFound._id,
        name: userFound.username
      });

      currentUser.pendingFriends.incoming = currentUser.pendingFriends.incoming.filter(obj => obj.name !== userFound.username);

      // save changes to database
      Promise.all([userFound.save(), currentUser.save()])
      .then(() => {
        res.json({
          message: 'success you have successfully accepted this users friend request'
        });
      })
      .catch(err => {
        res.json({
          message: 'unexpected error accepting friend request'
        });
      });

    })

    .catch(err => {
      res.json({
        message: 'unexpected error accepting friend request'
      });
    });
  })

  .catch(err => {
    console.log(err);
    res.sendStatus(404)
  });
  
}

module.exports = {
  // creating decks and flashcards and editing and deleting cards
  request,
  accept


  // request TYPE = POST
  // accept TYPE = POST
  // unfriend TYPE = POST

  // incoming TYPE = GET
  // outgoing TYPE = GET
}