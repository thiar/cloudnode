var express = require('express');
var app = express();
var session = require('express-session');
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
//app.set('layout', 'layout')

/*route declaration*/
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

/* Database connection*/
var connection = mysql.createPool({
  host     : '',
  user     : 'root',
  password : 'a',
  database : 'cloudnode',
  multipleStatements: true
});

 http.listen(3001, function(){
  console.log('listening on *:3001');
});

app.get('/',function(req,res){
	res.render('login', { layout: 'layout',page: req.url })
});

app.post('/login',function(req,res){
	  connection.query('SELECT * from customer', function(err, rows, fields) {
	  if (err) throw err;
	 
	  for(i=0;i<rows.length;i++){
	  	if(req.body.email==rows[i].email && req.body.pass==rows[i].pass){
		  	ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			req.session.login = true
			req.session.customer=rows[i];
		  }
	  }

	  var currip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	  if(req.session.login){
	  		res.redirect('/dashboard')
	  	}
	  else res.redirect('/')
	});
});

app.get('/dashboard',function(req,res){
	res.render('dashboard', { layout: 'layout',page: req.url })
});