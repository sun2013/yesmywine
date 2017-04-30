'use strict';
const Module = require('../module/mysql');
exports.findPetsByTags = function(args, res, next) {
  /**
   * discount
   *
   * returns List
   **/
  Module.getdiscountList(function(err,result){
  	if(err){
  		console.log(err.code);
  		return;
  	}
  	res.status(200).json({
  		status:200,
  		data:result
  	})
  })
}

