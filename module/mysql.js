var mysql = require('mysql'); //调用MySQL模块

var pool = mysql.createPool({
	host: 'localhost', //主机
	user: 'root', //MySQL认证用户名
	password: '123456',
	port: '3306',
	database: 'sun'
})
/*var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '123456',
  database : 'sun',
  port : 3306
});*/
var Module = {
	/*getUser: function(user,cb) {
		connection.query('SELECT * FROM user WHERE name = ?', [user.name],function(err, result) {
			cb(err,result);
		});
	},
	createUser: function(user,cb) {
		connection.query('INSERT INTO user (id,name,password,sex,age,createTime) values(?,?,?,?,?,?)',[0,user.name,user.password,user.sex,user.age,user.createTime],function(err, result) {
			cb(err,result);
		});*/
	getUser : function(user,cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('SELECT * FROM user WHERE name = ?', [user.name],function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	createUser : function(user,cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('INSERT INTO user (id,name,password,sex,age,createTime) values(?,?,?,?,?,?)',[0,user.name,user.password,user.sex,user.age,user.createTime],function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	updateUser : function(user,cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('UPDATE user SET password = ? WHERE name = ?',[user.newPassword,user.name],function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	getBannerList : function(cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('SELECT * FROM bannerList',function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	getHotList : function(cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('SELECT * FROM hotList',function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	getdiscountList : function(cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('SELECT * FROM discountList',function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	getGoodsList : function(cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('SELECT * FROM goodList',function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	getGoodsInfo : function(id,cb){
		pool.getConnection(function(err,conn){
			if(err){
				console.log(err);
			}
			else{
				conn.query('SELECT * FROM goodList WHERE id =?',[id],function(err, result) {
					conn.release();
					cb(err,result);
				});
			}
		})
	},
	
	
};
module.exports = Module;