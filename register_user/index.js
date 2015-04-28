var express = require('express');
var app = express();
expressLayouts = require('express-ejs-layouts');
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var mysql = require('mysql');
var partial = require('express-partial');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
app.use(partial())
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('layout', 'layout')
/*route declaration*/
app.get('/',function(req,res){
	res.render('home', { layout: 'layout' })
});

app.get('/login',function(req,res){
	res.render('login_user', { layout: 'layout' })
});

app.post('/login',function(req,res){
	res.redirect('/userpage')
});

app.get('/tes',function(req,res){
	res.end("hello");
})

app.get('/userpage',function(req,res){

	res.render('user_page', { layout: 'layout' })
})

/* Database connection*/
var connection = mysql.createPool({
  host     : '',
  user     : 'root',
  password : '',
  database : 'mydb'
});

 http.listen(3000, function(){
  console.log('listening on *:3000');
});