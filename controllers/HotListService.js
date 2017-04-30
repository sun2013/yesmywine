'use strict';
const Module = require('../module/mysql');
exports.hotList = function(args, res, next) {
  /**
   * hotList
   *
   * returns List
   **/
  Module.getHotList(function(err,result){
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

