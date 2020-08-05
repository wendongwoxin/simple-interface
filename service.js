var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var interface = require('./interface')
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');//*表示可以跨域任何域名都行 也可以填域名表示只接受某个域名
    res.header('Access-Control-Allow-Headers','X-Requested-With,Content-Type');//可以支持的消息首部列表
    res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');//可以支持的提交方式
    res.header('Content-Type','application/json;charset=utf-8');//请求头中定义的类型
    next();
});
//url解析 以键值对的形式
app.use(bodyParser.urlencoded({extended:true}));//Context-Type 为application/x-www-form-urlencoded 时 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.json());//用于解析json 会自动选择最为适宜的解析方式

var connection = mysql.createConnection({
	host		: '192.168.8.51',
	user		: 'root',
	password	: '123456',
	database	: 'study'
});
//如果连接成功  可以查询到数据表的信息

connection.connect();
app.post('/login', (req, res) => {
	interface.login(connection, req, res)
})
app.post('/user', (req, res) => {
	interface.user(connection, req, res)
})
app.listen(3000);