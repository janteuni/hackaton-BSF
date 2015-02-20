'use strict';

var fs = require('fs');
var Parse = require('parse').Parse;

Parse.initialize("tVSvJ98oAgrg5wR3HGbPYXfKmq7B39pvY9lhkC9k", "p3n6J5ZBETIl3nXpDYVOkAUWjMms2EP8bqZORstW");

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Userss
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  fs.readFile('server/api/user/user.data.json', 'utf-8', function (err, users) {
    if (err) { return handleError(res, err); }
    res.status(200).json(JSON.parse(users));
  });
};

/**
 * Get a single User
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  res.status(200).json({});
};

/**
 * Creates a new User
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  console.log(req.body);
  var user = new Parse.User();
  user.set("username", req.body.user.username);
  user.set("password", req.body.user.password);
  user.set("phone", "650-555-0000");

  user.signUp(null, {
    success: function(user) {
      console.log("New User sent!!")
    },
    error: function(user, error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
  res.status(201).json({});
};

/**
 * Updates an existing User
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  res.status(200).json({});
};

/**
 * Deletes a User
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  return res.status(204);
};
