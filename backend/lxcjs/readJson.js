var sys = require ('sys'),
	url = require('url'),
	http = require('http'),
	qs = require('querystring'),
    requestify = require('requestify');    

var net = require('net'),
	fs = require('fs');
//var config = require('./jsonFile.json');
var cp = require('child_process');
var mm = require('minimist');
var create = require('./create');

var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();
var bodyParser = require("body-parser");
var http = require('http').Server(app);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'address_service',
    debug    :  false
});

function handle_database(req,res) {
    var data = req.body.servicename;
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("SELECT * from service where nama_service="+data,function(err,rows, fields){
            connection.release();
            if(rows != undefined && rows.length > 0) {
              var id_address = rows[0].id_service;
                connection.query("SELECT * from address where id_service="+id_address, function(err, rows, fields){
                    res.json(rows);
                    console.log(rows);
                })          
            }
            else
            {
              connection.query("INSERT INTO service (id_service, nama_service) VALUES ('"+connection.threadId+"','"+data+"')",function(err,rows, fields){

                connection.query("UPDATE address SET id_service="+connection.threadId+" WHERE id_service=0 limit 1",function(err,rows, fields){

                  connection.query("SELECT * from address where id_service="+connection.threadId, function(err, rows, fields){
                    res.json(rows);
                    console.log(rows);
                  })                    
                })                 
              })
            }
                       
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

app.post("/start",function(req,res){
  
  handle_database(req,res);

});

app.post("/", function(req, res){
    var servicename = req.body.servicename;
    var re = / /gi;
    var newstr = servicename.replace(re, "_");  
    var option = req.body.option;
    console.log(req.body);
    if(option == 'create') create.clone(newstr);
    else if(option == 'start') create.start(newstr);
    else if(option == 'stop') create.stop(newstr);
    else if(option == 'delete') create.destroy(newstr);
    var result = {result : 'OK'}
    res.json(result);

})

app.listen(3000);


// var req_balancer = requestify.request('http://10.151.36.24:3000/start', {
//     method: 'POST',
//     body: {
//         servicename: 'serviceku',
//         request: '1000',
//         host: '10.151.43.162:9000',
//         worker1: '10.151.36.24:3000'
//     },
//     headers: {
//         'X-Forwarded-By': 'me'
//     },
//     cookies: {
//         mySession: 'some cookie value'
//     },
//     // auth: {
//     //     username: 'foo',
//     //     password: 'bar'
//     // },
//     dataType: 'json'        
// })
// .then(function(response) {
//     // get the response body 
//     response.getBody();
 
//     // get the response headers 
//     response.getHeaders();
 
//     // get specific response header 
//     response.getHeader('Accept');
 
//     // get the code 
//     response.getCode();
    
//     // get the raw response body 
//     response.body;
// });
// var stop_service = requestify.request('http://10.151.36.24:3000/stop', {
//     method: 'POST',
//     body: {
//         servicename: 'serviceku',
//         request: '1000',
//         host: '10.151.43.162:9000',
//         worker1: '10.151.36.24:3000'
//     },
//     headers: {
//         'X-Forwarded-By': 'me'
//     },
//     cookies: {
//         mySession: 'some cookie value'
//     },
//     // auth: {
//     //     username: 'foo',
//     //     password: 'bar'
//     // },
//     dataType: 'json'        
// })
// .then(function(response) {
//     // get the response body 
//     response.getBody();
 
//     // get the response headers 
//     response.getHeaders();
 
//     // get specific response header 
//     response.getHeader('Accept');
 
//     // get the code 
//     response.getCode();
    
//     // get the raw response body 
//     response.body;
// });


// server.listen( 9000 );