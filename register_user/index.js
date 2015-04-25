var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var http = require('http').Server(app);
var mysql = require('mysql');
app.use(express.static(__dirname + '/public'));


/*route declaration*/
app.use(bodyParser.urlencoded());


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