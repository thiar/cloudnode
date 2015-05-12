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

var server = http.createServer(function (req, res) {
    if(req.method=='POST') {
            var body='';
            req.on('data', function (data) {
                body +=data;
                //console.log(body);
            });
            req.on('end',function(){

                var POST =  qs.parse(body);
                console.log( POST );
                var data = JSON.stringify( POST );
                if(data.indexOf('create') > -1) create.clone(); // kurang parameter
                else if(data.indexOf('start') > -1) create.start();
                else if(data.indexOf('stop') > -1) create.stop();
                else if(data.indexOf('delete') > -1) ccreate.destroy();
                res.writeHead( 200 );
                res.write( JSON.stringify( POST ) );
                res.end();                 
            });
    }
    else if(req.method=='GET') {

        var url_parts = url.parse(req.url,true);
        console.log(url_parts.query);
        res.writeHead( 200 );
        res.write( JSON.stringify( url_parts.query ) );
        res.end();
    }               
});

var req_balancer = requestify.request('http://10.151.43.162:1000/start', {
    method: 'POST',
    body: {
        servicename: 'serviceku',
        request: '1000',
        host: '10.151.43.162:9000',
        worker1: '10.151.36.24:3000'
    },
    headers: {
        'X-Forwarded-By': 'me'
    },
    cookies: {
        mySession: 'some cookie value'
    },
    // auth: {
    //     username: 'foo',
    //     password: 'bar'
    // },
    dataType: 'json'        
})
.then(function(response) {
    // get the response body 
    response.getBody();
 
    // get the response headers 
    response.getHeaders();
 
    // get specific response header 
    response.getHeader('Accept');
 
    // get the code 
    response.getCode();
    
    // get the raw response body 
    response.body;
});
var stop_service = requestify.request('http://10.151.43.162:1000/stop', {
    method: 'POST',
    body: {
        servicename: 'serviceku',
        request: '1000',
        host: '10.151.43.162:9000',
        worker1: '10.151.36.24:3000'
    },
    headers: {
        'X-Forwarded-By': 'me'
    },
    cookies: {
        mySession: 'some cookie value'
    },
    // auth: {
    //     username: 'foo',
    //     password: 'bar'
    // },
    dataType: 'json'        
})
.then(function(response) {
    // get the response body 
    response.getBody();
 
    // get the response headers 
    response.getHeaders();
 
    // get specific response header 
    response.getHeader('Accept');
 
    // get the code 
    response.getCode();
    
    // get the raw response body 
    response.body;
});
server.listen( 9080 );

// fs.readFile('./jsonFile.json', 'utf8', function (err, data) {
// 	if (err) throw err;

// 	else if(data.indexOf('create') > -1){
// 		cp.fork('./lxc.js');
// 		console.log('jalankan fungsi create'+' '+config.create['nama']);
// 	}

// 	else if(data.indexOf('start') > -1){ 
// 		cp.fork('./lxc.js');
// 		console.log('jalankan fungsi start'+' '+config.start);
// 	}

// 	else if(data.indexOf('stop') > -1){
// 		cp.fork('./lxc.js');
// 		console.log('jalankan fungsi stop'+' '+config.stop);
// 	}

// 	else if(data.indexOf('delete') > -1){
// 		cp.fork('./lxc.js');
// 		console.log('jalankan fungsi delete'+' '+config.delete);
// 	}
// });

