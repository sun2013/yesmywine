'use strict';
const Module = require('../module/mysql');
exports.bannerList = function(args, res, next) {
  /**
   * 轮播图
   *
   * no response value expected for this operation
   **/
  Module.getBannerList(function(err,result){
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

