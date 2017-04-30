'use strict';

var url = require('url');

var User = require('./UserService');

module.exports.createUser = function createUser (req, res, next) {
  User.createUser(req.swagger.params, req, res, next);
};

module.exports.getUserByName = function getUserByName (req, res, next) {
  User.getUserByName(req.swagger.params, req, res, next);
};

module.exports.loginUser = function loginUser (req, res, next) {
  User.loginUser(req.swagger.params, req, res, next);
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser(req.swagger.params, req, res, next);
};

module.exports.updateUser = function updateUser (req, res, next) {
  User.updateUser(req.swagger.params,req, res, next);
};
