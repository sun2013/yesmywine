'use strict';

var url = require('url');

var List = require('./ListService');

module.exports.list = function list (req, res, next) {
  List.list(req.swagger.params, res, next);
};
