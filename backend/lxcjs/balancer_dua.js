var http = require('http'),
    httpProxy = require('http-proxy');
var options = {
  router: {
    'foo.com/baz': '127.0.0.1:3000',
    'foo.com/buz': '127.0.0.1:8002',
    'bar.com/buz': '127.0.0.1:8003'
  }
};
var proxyServer = httpProxy.createServer(options);
proxyServer.listen(80);