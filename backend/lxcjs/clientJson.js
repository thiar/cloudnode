var querystring = require('querystring');
    http = require('http');

var postData = querystring.stringify({
  'msg' : 'Hello World!',
  'create': 'John',
  'start': 'Smith',
  'stop': 25,
  'delete' : 'ok'
});

var options = {
  hostname: 'localhost',
  port: 9080,
  path: '/home/agus',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();