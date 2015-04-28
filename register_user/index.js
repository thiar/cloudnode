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
app.set('layout', 'layout')
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
  password : '',
  database : 'cloudnode'
});

 http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.get('/',function(req,res){
	res.render('home', { layout: 'layout' })
});
app.post('/register',function(req,res){
	var firstname=req.body.firstname
	var lastname=req.body.lastname
	var address=req.body.address
	var country=req.body.country
	var province=req.body.province
	var city=req.body.city
	var zipcode=req.body.zipcode
	var dob=req.body.dateofbirth
	var email=req.body.email
	var pass=req.body.pass
	var succes=false
	connection.query('INSERT INTO `customer`(`idCustomer`,`firstname`, `lastname`, `address`, `country`, `province`, `city`, `zipcode`, `dob`, `email`, `pass`)VALUES ("",\''+firstname+'\',\''+lastname+'\',\''+address+'\',\''+country+'\',\''+province+'\',\''+city+'\',\''+zipcode+'\',\''+dob+'\',\''+email+'\',\''+pass+'\')'), function(err, rows, fields) 
	{
		if (err) throw err;

	}
	res.render('succes', { layout: 'layout' })
		
});
	
//});
app.get('/login',function(req,res){
	if (req.session.login!=null && req.session.login==true)
	{
	  		res.redirect('/userpage')
	}
	else 
	{
		res.render('login_user', { layout: 'layout' })
	};
});

app.post('/login',function(req,res){
	  connection.query('SELECT * from customer', function(err, rows, fields) {
	  if (err) throw err;
	 
	  for(i=0;i<rows.length;i++)
	  {
	  	if(req.body.email==rows[i].email && req.body.pass==rows[i].pass){
		  	ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
			req.session.login = true
		  }
	  
	  }
	  var currip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	  if(req.session.login)
	  	{
	  		res.redirect('/userpage')
	  	}
	  else res.redirect('/login')
	});
	
});

app.get('/userpage',function(req,res){
	if (req.session.login!=null && req.session.login==true)
	{
	  		res.render('user_page', { layout: 'layout' })

	}
	else res.redirect('/login')
});

app.get('/logout',function(req,res){
	req.session.destroy()
	res.redirect('/login')
});

app.get('/succes',function(req,res){
	res.render('succes', { layout: 'layout' })
});