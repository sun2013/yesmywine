'use strict';
const Module = require('../module/mysql');
exports.list = function(args, res, next) {
  /**
   * list
   *
   * returns List
   **/
  Module.getGoodsList(function(err,result){
  	if(err){
  		console.log(err.code);
  		return;
  	}
  	res.status(200).json({
  		status:'ok',
  		data:result
  	})
  })
}

