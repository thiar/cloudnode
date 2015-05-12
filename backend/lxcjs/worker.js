var sys = require ('sys'),

    http = require('http'),
    requestify = require('requestify'),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    express = require('express'),    
    app = express();    

var create = require('./create');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.post("/start", function(req, res){
    var servicename = req.body.servicename;
    var ip_address = req.body.ip_address;
    //create.start(servicename, ip_address);
    console.log("masuk start");

    var result = {result : 'START OK'}
    res.json(result);
})

app.post("/stop", function(req, res){
    var servicename = req.body.servicename;
    //create.stop(servicename);
       
    var result = {result : 'STOP OK'}
    res.json(result);
})

app.listen(3000);