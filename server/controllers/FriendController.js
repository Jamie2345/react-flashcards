const User = require('../models/User');


const request = (req, res, next) => {
  
  const { userToRequest } = req.body;

  User.findById(req.userInfo.id)
  .then(currentUser => {
    // if user not found
    if (!currentUser) {
      res.status(404).json({ message: 'Invalid user ID' });
      return;
    }

    // if already friends with this user
    if (currentUser.friends.some(friend => friend.name === userToRequest)) {
      res.status(409).json({ message: 'This user is already your friend' });
      return;
    }

    // check if user is already requesting
    if (currentUser.pendingFriends.outgoing.some(pending => pending.name === userToRequest)) {
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
  
  const { acceptUser } = req.body;

  User.findById(req.userInfo.id) // req.userInfo.id is the id of the user making the request (.userInfo is created in a middleware function)
  .then(currentUser => {

    // check if currentUser is found, then make sure not already friends and that a request has been sent already

    if (!currentUser) {
      res.status(404).json({ message: 'Invalid user ID' });
      return;
    }

    // if already friends
    if (currentUser.friends.some(friend => friend.name === acceptUser)) {
      res.status(409).json({ message: 'This user is already your friend' });
      return;
    }

    // if the user hasn't sent a friend request
    if (!(currentUser.pendingFriends.incoming.some(incomingFriend => incomingFriend.name === acceptUser))) {
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

      // remove all the the pending requests as they are now accepted
      userFound.pendingFriends.outgoing = userFound.pendingFriends.outgoing.filter(pending => pending.name !== currentUser.username);

      currentUser.friends.push({
        userId: userFound._id,
        name: userFound.username
      });

      currentUser.pendingFriends.incoming = currentUser.pendingFriends.incoming.filter(pending => pending.name !== userFound.username);

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

const unfriend = (req, res, next) => {
  
  const {unfriendUser} = req.body;

  User.findById(req.userInfo.id) // req.userInfo.id is the id of the user making the request (.userInfo is created in a middleware function)
  .then(currentUser => {

    // check if currentUser is found
    if (!currentUser) {
      res.status(404).json({ message: 'Invalid user ID' });
      return;
    }

    // if not already friends
    if (!(currentUser.friends.some(friend => friend.name === unfriendUser))) {
      res.status(409).json({ message: 'This user is not your friend' });
      return;
    }

    // find the user to accept
    User.findOne({username: unfriendUser})
    .then(userFound => {

      if (!userFound) {
        res.status(404).json({ message: 'User does not exist' });
        return;
      }

      // remove the user from the friends list (filter them out)
      userFound.friends = userFound.friends.filter(friend => friend.name !== currentUser.username);
      // remove the friend from the other person as well
      currentUser.friends = currentUser.friends.filter(friend => friend.name !== userFound.username); // userFound.username === unfriendUser Variable

      // save changes to database
      Promise.all([userFound.save(), currentUser.save()])
      .then(() => {
        res.json({
          message: 'success you have successfully unfriended the user'
        });
      })
      .catch(err => {
        res.json({
          message: 'unexpected error unfriending the user'
        });
      });
    })

    .catch(err => {
      console.log(err);
      res.sendStatus(404)
    });

  });
}


module.exports = {
  // creating decks and flashcards and editing and deleting cards
  request,
  accept,

  unfriend


  // request TYPE = PUT
  // accept TYPE = PUT
  // unfriend TYPE = DELETE
  // unfriend TYPE = DELETE

  // incoming TYPE = GET
  // outgoing TYPE = GET
}