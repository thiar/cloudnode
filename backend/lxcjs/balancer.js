var arguments = process.argv.splice(2);
var httpProxy = require('http-proxy');

//
// Addresses to use in the round robin proxy
//
var addresses = [
    {
        host: '10.151.36.78',
        port: 80
    },
    {
        host: 'ajk.if.its.ac.id',
        port: 80
    },
    {
        host: 'localhost',
        port: 3000
    }
];

var i = 0;
httpProxy.createServer(function (req, res, proxy) {
    proxy.proxyRequest(req, res, addresses[i]);

    i = (i + 1) % addresses.length;
}).listen(arguments[0] || 8000);