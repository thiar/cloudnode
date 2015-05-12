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

app.listen(3000);