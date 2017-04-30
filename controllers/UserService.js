'use strict';
const Module = require('../module/mysql');
const _ = require('lodash');
const sd = require('silly-datetime');
exports.createUser = function(args, req, res, next) {
	/**
	 * 创建用户
	 * 注册
	 *
	 * body User Created user object (optional)
	 * no response value expected for this operation
	 **/
	var user = req.body;
	if(_.isEmpty(user.name)||_.isUndefined(user.name)||_.isEmpty(user.password)||_.isUndefined(user.password)) {
		res.status(200).json({
			status: 200,
			msg: '参数缺失'
		});
		return;
	};
	
	//设置时间戳；
	user.createTime = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
	Module.createUser(user, function(err, result) {
		if(err) {
			if(err.code === 'ER_DUP_ENTRY') {
				res.status(200).json({
					status: 200,
					msg: '用户名已存在'
				})
			}
			return;
		}
		res.status(200).json({
					status: 200,
					msg: '注册成功'
				})
	})
}

exports.getUserByName = function(args, req, res, next) {
	/**
	 * Get user by user name
	 * 
	 *
	 * username String The name that needs to be fetched. Use user1 for testing.
	 * returns User
	 **/
	var name = args.username.value;
	var user = {
		name: name
	}
	Module.getUser(user, function(err, result) {
		if(err) {
			console.log(err);
			return;
		};
		if(req.session.user) {
			res.status(200).json({
				status: 'ok',
				name : result.name,
				sex : result.sex,
				age : resule.age,
				createTime : result.createTime
			})
		}
		else{
			res.status(200).json({
				status:'error',
				msg:'用户未登录'
			})
		}
	})

}

exports.loginUser = function(args, req, res, next) {
	/**
	 * 登陆
	 * 登陆
	 *
	 * username String The user name for login (optional)
	 * password String The password for login in clear text (optional)
	 * returns String
	 **/
	var name = req.body.name;
	var password = req.body.password;
	var user = {
		name : name
	}
	if(req.session.user){
		res.status(200).json({
			status:200,
			msg:'用户已登陆'
		});
		return;
	}
	
	Module.getUser(user,function(err,result){
		if(err){
			console.log(err);
		}
		if(result[0].password === password){
			console.log(req.session)
			req.session.user = name;
			console.log(req.session)
			res.status(200).json({
				status:200,
				msg:'登陆成功',
				name : name,
			});
			return;
		}
		if(result[0].password !== password){
			res.status(200).json({
				status:200,
				msg:'密码错误',
			});
			return;
		}
	})
}

exports.logoutUser = function(args,req, res, next) {
	/**
	 * Logs out current logged in user session
	 * 
	 *
	 * no response value expected for this operation
	 **/
	req.session.user = null;
	res.status(200).json({
		status:200,
		msg:'退出成功'
	})
}

exports.updateUser = function(args,req, res, next) {
	/**
	 * Updated user
	 * This can only be done by the logged in user.
	 *
	 * username String name that need to be deleted
	 * body User Updated user object (optional)
	 * no response value expected for this operation
	 **/
	if(!req.session.user){
		res.status(200).json({
			status:404,
			msg:'用户未登录'
		});
		return;
	}
	var name = req.body.name;
	var password = req.body.password;
	var newPassword = req.body.newPassword;
	var user = {
		name : name
	}
	Module.getUser(user,function(err,result){
		if(err){
			console.log(err.code);
			return;
		}
		if(result[0].password === password){
			user.newPassword = newPassword;
			Module.updateUser(user,function(err,result){
				if(err){
					console.log(err.code);
					return;
				}
				res.status(200).json({
					status:200,
					msg:'密码修改成功',
				});
				
			})
		}
		if(result[0].password !== password){
			res.status(200).json({
				status:200,
				msg:'原始密码错误',
			});
			return;
		}
	})
}