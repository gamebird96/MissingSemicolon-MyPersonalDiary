/**
 * @file Used for authentication of user 
 * @author Soumyadeep Thakur
 */

var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');

/**
 * Sends JSON response for user registration
 * @param {String} res response from server
 * @param {String} status status of response
 * @param {String} content JSON content
 */
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/**
 * Used for user registration in backend
 * @param {String} req request to server
 * @param {String} res response from server
 */
module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.uname = req.body.uname;
  user.phone = req.body.phone;
  user.gender = req.body.gender;

  user.setPassword(req.body.pass);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });

};
/**
 * Used for user login by verifying username and cryptographically salted password
 * @param {*} req request to server
 * @param {*} res response from server
 */
module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log('hei'+req.body.uname+req.body.pass);
  var uname = req.body.uname;
  var newpass = req.body.pass;
  User.findOne({ 'uname': uname }, 'uname pass salt', function (err, user) 
  {
    console.log(JSON.stringify(user));
    if (err)
    {
      res.status(404).json(err);
      return;
    }
    if(user)
    {
      userobj = new User()
      userobj.uname = user.uname;
      userobj.pass = user.pass;
      userobj.salt = user.salt;
      if (userobj.validPassword(newpass))
      {
        token = user.generateJwt();
        res.status(200);
        res.json({"token" : token});
      }
      else
      {
        console.log('Get lost');
        res.status(401).json({"message": "Incorrect username or password"});
      }
    }
    else
    {
      console.log('You prick');
      res.status(401).json({"message": "Incorrect username or password"});
    }
  });
  /*
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
*/
};