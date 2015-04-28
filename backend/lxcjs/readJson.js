var sys = require ('sys'),
	url = require('url'),
	http = require('http'),
	qs = require('querystring');

var net = require('net'),
	fs = require('fs');
var config = require('./jsonFile.json');
var cp = require('child_process');

var server = http.createServer(function (req, res) {
    if(req.method=='POST') {
            var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){

                var POST =  qs.parse(body);
                //console.log(POST);
                res.writeHead( 200 );
                res.write( JSON.stringify( POST ) );
                res.end();                 
            });
    }
    else if(req.method=='GET') {

        var url_parts = url.parse(req.url,true);
        //console.log(url_parts.query);
        res.writeHead( 200 );
        res.write( JSON.stringify( url_parts.query ) );
        res.end();
    }               
});
server.listen( 9080 );



fs.readFile('./jsonFile.json', 'utf8', function (err, data) {
	if (err) throw err;

	else if(data.indexOf('create') > -1){
		cp.fork('./lxc.js');
		console.log('jalankan fungsi create'+' '+config.create['nama']);
	}

	else if(data.indexOf('start') > -1){ 
		cp.fork('./lxc.js');
		console.log('jalankan fungsi start'+' '+config.start);
	}

	else if(data.indexOf('stop') > -1){
		cp.fork('./lxc.js');
		console.log('jalankan fungsi stop'+' '+config.stop);
	}

	else if(data.indexOf('delete') > -1){
		cp.fork('./lxc.js');
		console.log('jalankan fungsi delete'+' '+config.delete);
	}
});

