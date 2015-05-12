var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var mysql = require('mysql');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

var connection = mysql.createPool({
  host     : '',
  user     : 'root',
  password : '',
  database : 'address_service',
  multipleStatements: true
});

var id_ip = 1;

app.post('/start',function(req, res){
	var data = req.body.servicename;
	connection.query('SELECT * from service where nama_service='+data+'', function(err, rows, fields) {
		if(rows.length > 0 )
		{
			var id_address = rows[0].id_address;
			connection.query('SELECT * from address where id_service='+id_address+'', function(err, rows, fields){
				res.json(rows);
			})
		}
	});
});

connection.end();

http.listen(3000, function(){
	console.log('listening on *:3000');
});
