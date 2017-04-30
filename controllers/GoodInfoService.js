'use strict';
const Module = require('../module/mysql');
exports.getGoodsInfo = function(args, req, res, next) {
  /**
   * goods info
   *
   * goodId Long ID of pet that needs to be fetched
   * returns Pet
   **/
  var id = args.goodId.value;
  Module.getGoodsInfo(id,function(err,result){
  	if(err){
  		console.log(err);
  	}
  	res.status(200).json({
  		status:'ok',
  		data:result[0]
  	})
  })
}

