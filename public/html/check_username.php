<?php

// 当前文件作用：检测在服务器数据库中是否是有指定用户名的用户已存在
// {"status":0} -- 用户已存在
// {"status":1} -- 用户不存在

header('Content-Type:text/html;charset=utf-8');
header("Access-Control-Allow-Origin:*"); //允许任何访问(包括ajax跨域) 
$host='localhost';//主机  
$user='root';//数据库账号  
$password='123456';//数据库密码
$database='online';//数据库名
@mysql_connect($host,$user,$password) or die("error");//连接数据库管理系统  
@mysql_select_db($database);//选择操作数据库  
@mysql_query("SET NAMES utf8");//设置设置UTF-8编码(JSON的唯一编码)，数据库整理为：utf8_general_ci，以此达到输出中文简体的目的  
  
$username = !empty($_GET['username']) ? $_GET['username'] : "";
// $sql = "SELECT * FROM user";//获取所有用户
$sql = "SELECT * FROM users where username='".$username."'";//根据username获取用户
$returnData=@mysql_query($sql); 
  
while($result=@mysql_fetch_assoc($returnData)){  
   $user_info[]=$result;//将取得的所有数据，一行两行或者三行，赋值给user_info数组  
}
if(!empty($user_info)) {
	// echo 0;//0 已存在
	$ret = array(
    'status' => 0,
	);
	echo json_encode($ret);
	exit();// echo 不能结束脚本   需要exit 结束脚本
} else {
	// echo 1;//1 不存在
	$ret = array(
    'status' => 1,
	);
	echo json_encode($ret);
	exit();
}
?>  