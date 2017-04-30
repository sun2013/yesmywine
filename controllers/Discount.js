'use strict';

var url = require('url');

var Discount = require('./DiscountService');

module.exports.findPetsByTags = function findPetsByTags (req, res, next) {
  Discount.findPetsByTags(req.swagger.params, res, next);
};
