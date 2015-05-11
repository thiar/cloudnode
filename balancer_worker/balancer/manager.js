var express = require('express');
var app = express();
var forever =require('forever');
var bodyParser = require("body-parser");
var http = require('http').Server(app);

var service ={}
app.use(bodyParser.urlencoded());
app.post('/start',function(req,res){
	//console.log(req.body)
	var servicename =req.body.servicename
	var request =req.body.request
	var host =req.body.host
	var worker1 =req.body.worker1
	var worker2=req.body.worker2
	if(worker2==undefined)
	{
		var sys = require('sys')
		var exec = require('child_process').exec;
		
		console.log(cmd)
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec( cmd, puts);
		service[servicename]=servicename;
		res.end("start")
	}
	else
	{
		var sys = require('sys')
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		var cmd="forever start -a --uid \""+servicename+"\" index.js "+request+" "+host+" "+worker1+" "+worker2 ;
		exec(cmd, puts);
		service[servicename]=servicename;
		res.end("start")
	}
})
app.post('/stop',function(req,res){
	var servicename =req.body.servicename
	if((servicename in service))
	{
		var sys = require('sys')
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("forever stop "+service[servicename], puts);
		delete service[servicename]
	}
	res.end("stop")
})


http.listen(1000, function(){
  console.log('listening on *:1000');
});