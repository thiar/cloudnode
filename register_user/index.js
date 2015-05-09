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
  database : 'cloudnode',
  multipleStatements: true
});

 http.listen(3000, function(){
  console.log('listening on *:3000');
});


app.get('/',function(req,res){
	res.render('home', { layout: 'layout',page: req.url })
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
	res.render('succes', { layout: 'layout',page: req.url })
		
});
	
//});
app.get('/login',function(req,res){
	if (req.session.login!=null && req.session.login==true)
	{
	  		res.redirect('/userpage')
	}
	else 
	{
		res.render('login_user', { layout: 'layout',page: req.url })
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
			req.session.customer=rows[i];
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
app.post('/newService',function(req,res){
	var amount=req.body.data.amount
  	var serviceName=req.body.data.serviceName
  	var loot=req.body.data.loot
	var memory=req.body.data.memory
	var space=req.body.data.space
	var bandwith=req.body.data.bandwith
	var request=req.body.data.request
	var worker=req.body.data.worker
	var newApp=req.body.data.newApp
	var newDb=req.body.data.newDb
	var status="STOP"
	var ip="0.0.0.0"
	var port ="8080"
	connection.query('INSERT INTO `service`(`idservice`,`customer_idcustomer`, `namaservice`, `memory`, `space`, `bandwith`, `request`, `worker`, `status`, `ip`,`port`,`app_idapp`,`DB_idDB`)VALUES("",\''+req.session.customer.idCustomer+'\',\''+serviceName+'\',\''+memory+'\',\''+space+'\',\''+bandwith+'\',\''+request+'\',\''+worker+'\',\''+status+'\',\''+ip+'\',\''+port+'\',\''+newApp+'\',\''+newDb+'\')', function(err, rows, fields) 
	{
		res.setHeader('Content-Type', 'application/json');
		if (err){
			res.end(JSON.stringify({ status: err.code }));
		}
		else
		{
			res.end(JSON.stringify({ status: "OK" }));
		}
		//console.log(amount+" "+loot+" "+memory+" "+space+" "+bandwith+" "+request+" "+worker+" "+newDb+" "+newApp + " "+serviceName);
		
		
	});
	
	
});
app.get('/userpage',function(req,res){
	if (req.session.login!=null && req.session.login==true)
	{

		connection.query('SELECT * from app;SELECT * from db;', function(err, rows, fields) {
	  		if (err) throw err;
	  		req.session.apps=rows[0];
	  		req.session.dbs=rows[1];
	  		res.render('user_page', { layout: 'layout',page: req.url,customer:req.session.customer,allApp:req.session.apps,allDb:req.session.dbs});
	  	}); 
	}
	else res.redirect('/login')
});

app.get('/logout',function(req,res){
	req.session.destroy()
	res.redirect('/login')
});

app.get('/succes',function(req,res){
	res.render('succes', { layout: 'layout',page: req.url })
});