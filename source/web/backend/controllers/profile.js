/**
 * @file File for handling user profile
 * @author Soumyadeep Thakur
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

/**
 * Reads user profile when user logn in
 * @param {String} req request to server
 * @param {String} res response from server
 */
module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
