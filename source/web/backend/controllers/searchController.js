/**
 * @file Used for searching queries of user
 * @author Soumyadeep Thakur
 */

//var passport = require('passport');
var mongoose = require('mongoose');
var Post = require('../models/post');

/**
 * Searches posts by queries of user
 * @param {String} req request to server
 * @param {String} res response from server
 */
module.exports.searchByQuery = function(req, res) {

  console.log('search');

  Post.find({ $text: { $search: req.body.query }, private: false }, {score: { $meta: "textScore" } }, {"image": 0}
    ).sort({score: { $meta: 'textScore'} }
    ).exec((err, list) => {
      console.log(list)
      if (!err) res.json(list);
      else res.json({'status': 'Query failed'});
    });
}