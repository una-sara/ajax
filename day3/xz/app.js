const express=require('express');
//引入body-parser中间件
const bodyParser=require('body-parser');
//引入用户路由器
const userRouter=require('./routes/user.js');
const demo=require('./routes/demo.js');
const pro=require('./routes/pro.js');
//创建web服务器
var app=express();
//监听端口
app.listen(8080);
//托管静态资源到public目录下
app.use( express.static('public') );
app.use( express.static('myajax') );
app.use( express.static('mypro') );
//使用body-parser中间件
app.use( bodyParser.urlencoded({
  extended:false
}) );

//使用路由器，挂载到/user下
// /user/reg
app.use('/user',userRouter);
app.use('/demo',demo);
app.use('/pro',pro);
