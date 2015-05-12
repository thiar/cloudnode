var requestify = require('requestify');
var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var path    = require("path");
app.use(bodyParser.urlencoded());

app.get('/',function (req,res){
	res.sendFile(path.join(__dirname+'/unit_testing.html'));
});
app.post('/test', function (req,res){
	// res.send('tes request');
	var ipaddress = req.body.ipaddress;
	var port = req.body.port;
	var request = req.body.request;
	console.log("hai");
	// console.log(ipaddress);
	for(var i=0;i<request;i++){
	requestify.get('http://'+ipaddress+':'+port).then(function(response){
			response.getBody();

			response.body;
	console.log(response.getBody());
	
			});
		 
		// console.log(i);
	}
	res.end("sukses");
	// res.sendStatus(i);
});


var server = app.listen(3000, function(){
	
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

