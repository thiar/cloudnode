var http = require('http');
var net = require('net');
var fs = require('fs');
var config = require('./jsonFile.json')

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '10.151.36.79');
console.log('Server running at http://10.151.36.79:1337');

/*var server = net.createServer(function (socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});

server.listen(1337, '10.151.36.79');
*/
fs.readFile('./jsonFile.json', 'utf8', function (err, data) {
if (err) throw err;

else if(data.indexOf('create') > -1) 
	console.log('jalankan fungsi create'+' '+config.create['nama']);

else if(data.indexOf('start') > -1) 
	console.log('jalankan fungsi start'+' '+config.start);

else if(data.indexOf('stop') > -1) 
	console.log('jalankan fungsi stop'+' '+config.stop);

else if(data.indexOf('delete') > -1) 
	console.log('jalankan fungsi delete'+' '+config.delete);
});
