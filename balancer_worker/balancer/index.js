var net = require('net');


var addrRegex = /^(([a-zA-Z\-\.0-9]+):)?(\d+)$/;
var ip= {}
var addr = {
    from: addrRegex.exec(process.argv[3]),
    to: addrRegex.exec(process.argv[4]),
    to2: addrRegex.exec(process.argv[5]),
    sink: addrRegex.exec("localhost:5000")
};

if (!addr.from || !addr.to) {
    console.log('Usage: <from> <to>');
    return;
}

var request=process.argv[2]
net.createServer(function(from) {
    var to = net.createConnection({
        host: addr.to[2],
        port: addr.to[3]
    });
    if(!(from.remoteAddress in ip))
    {
        ip[from.remoteAddress]=Math.floor(Math.random() * (10 - 1) + 1);
    }
    if(request<0)
    {
        var sink = net.createConnection({
            host: addr.sink[2],
            port: addr.sink[3]
        });
        from.pipe(sink);
        sink.pipe(from);
    }
    else if(!addr.to2)
    {
        from.pipe(to);
        to.pipe(from); 
        console.log(from.remoteAddress+" assign to " + addr.to[2])  
    }
    else
    {
        var to2 = net.createConnection({
            host: addr.to2[2],
            port: addr.to2[3]
        });
        if(ip[from.remoteAddress]%2==0)
        {
            from.pipe(to);
            to.pipe(from);       
            console.log(from.remoteAddress+" assign to " + addr.to[2])
        }
        else
        {
            from.pipe(to2);
            to2.pipe(from);
            console.log(from.remoteAddress+" assign to " + addr.to2[2])
        }
    }
    request--;
    
}).listen(addr.from[3], addr.from[2]);