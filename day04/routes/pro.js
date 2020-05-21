const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.登陆接口,使用restful的get方法
router.get("/v1/login/:uname&:upwd",(req,res)=>{
	//获取参数
	var $uname=req.params.uname;
	var $upwd=req.params.upwd;
	//查询数据库
	var sql="select * from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//2.userlist 查 get不需要参数
router.get("/v1/userlist",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//3.根据uid删除用户
router.delete("/v1/deluser/:uid",(req,res)=>{
	var $uid=req.params.uid;
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err) throw err;
		res.send("1");
	});
});	
//4.根据uid查询某一个用户信息
//restful--get
router.get("/v1/queryuser/:uid",(req,res)=>{
	//获取uid
	var $uid=req.params.uid;
	//查询数据库
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(result.length>0){
			res.send(result);
		}else{
			res.send("0");
		}
	});
});
//5.修改用户信息的接口 put
//put方法基本上跟post一样
router.put("/v1/updateuser",(req,res)=>{
//1.接收前端传过来的数据
	var $uid=req.body.uid;
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $phone=req.body.phone;
	var $email=req.body.email;
	var $user_name=req.body.user_name;
	var $gender=req.body.gender;
//2.写sql语句
	var sql="update xz_user set uname=?,upwd=?,email=?,phone=?,user_name=?,gender=? where uid=?";
//3.连接池进行数据操作
    pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		res.send("1");
	});

});

//导出路由器对象
module.exports=router;