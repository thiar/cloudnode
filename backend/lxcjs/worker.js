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

app.post("/create", function(req, res){
    var servicename = req.body.servicename;
    var ip_address = req.body.ip_address;
    create.clone('template', servicename);
    console.log("masuk create");
    var result = {result : 'CREATE OK'}
    res.json(result);
})

app.post("/start", function(req, res){
    var servicename = req.body.servicename;
    var ip_address = req.body.ip_address;
    create.start(servicename, ip_address);
    console.log("masuk start");
    var result = {result : 'START OK'}
    res.json(result);
})

app.post("/stop", function(req, res){
    var servicename = req.body.servicename;
    create.stop(servicename);
    console.log("masuk stop");       
    var result = {result : 'STOP OK'}
    res.json(result);
})

app.post("/remove", function(req, res){
    var servicename = req.body.servicename;
    create.destroy(servicename);
    console.log("masuk remove");       
    var result = {result : 'REMOVE OK'}
    res.json(result);
})

app.listen(3000);