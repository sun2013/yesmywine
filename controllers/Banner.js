'use strict';

var url = require('url');

var Banner = require('./BannerService');

module.exports.bannerList = function bannerList (req, res, next) {
  Banner.bannerList(req.swagger.params, res, next);
};
