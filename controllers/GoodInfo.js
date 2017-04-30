'use strict';

var url = require('url');

var GoodInfo = require('./GoodInfoService');

module.exports.getGoodsInfo = function getGoodsInfo (req, res, next) {
  GoodInfo.getGoodsInfo(req.swagger.params, req, res, next);
};
