'use strict';

var url = require('url');

var HotList = require('./HotListService');

module.exports.hotList = function hotList (req, res, next) {
  HotList.hotList(req.swagger.params, res, next);
};
