var sys = require ('sys'),
	url = require('url'),
	http = require('http'),
	qs = require('querystring'),
    requestify = require('requestify'),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    express = require('express'),    
    app = express();    

var create = require('./create');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

var pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'address_service',
    debug    :  false
});

var check;

function handle_database(req, res) {
    var re = / /gi;
    var data = req.body.servicename.replace(re, "_");
    var worker = req.body.worker;
    var option = req.body.option;
    var request = req.body.request;
    
    pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          //res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("SELECT * from service where nama_service='"+data+"'",function(err,rows, fields){
            connection.release();
            // console.log("0");
            // console.log(rows);
            if(rows != undefined && rows.length > 0) {
                var id_address = rows[0].id_service;
                var status = rows[0].status;
                if((status != "START" && option == "START") || (status != "STOP" && option == "STOP"))
                {
                    connection.query("SELECT * from address where id_service='"+id_address+"'", function(err, rows, fields){
                    //res.json(rows);
                        
                        // console.log("1");
                        // console.log(rows);
                        control_lxc(data, rows, option, request);
                        var result = {
                            status : option,
                            ip_webconsole : rows[0].ip_webconsole,
                            port_webconsole : rows[0].port_webconsole,
                            ip_balancer : rows[0].ip_balancer,
                            port_balancer : rows[0].port_balancer
                        }
                        res.json(result); 

                        connection.query("UPDATE service SET status='"+option+"' WHERE nama_service='"+data+"'",function(err,rows, fields){
                            
                            console.log("UPDATE STATUS");
                        })
                    })
                    
                }
                else
                {
                    check = 0;
                    var result = {result : 'YOUR SERVICE IS ALREADY '+option}
                    res.json(result);
                    return;
                    
                }
                          
            }
            else
            {
              connection.query("INSERT INTO service (id_service, nama_service, status) VALUES ('"+connection.threadId+"','"+data+"', 'START')",function(err,rows, fields){
                if(worker == 1)
                {
                    connection.query("UPDATE address SET id_service="+connection.threadId+" WHERE id_service=0 limit 1",function(err,rows, fields){

                        connection.query("SELECT * from address where id_service='"+connection.threadId+"'", function(err, rows, fields){
                            //res.json(rows);
                            // console.log("2");
                            // console.log(rows);
                            control_lxc(data, rows, option, request);
                            var result = {
                                status : option,
                                ip_webconsole : rows[0].ip_webconsole,
                                port_webconsole : rows[0].port_webconsole,
                                ip_balancer : rows[0].ip_balancer,
                                port_balancer : rows[0].port_balancer
                            }
                            res.json(result); 
                        })                    
                    }) 

                }
                else
                {
                    connection.query("UPDATE address SET id_service="+connection.threadId+" WHERE id_service=0 limit 2",function(err,rows, fields){

                        connection.query("SELECT * from address where id_service="+connection.threadId, function(err, rows, fields){
                            //res.json(rows);
                            // console.log("3");
                            // console.log(rows);
                            control_lxc(data, rows, option, request);
                            var result = {
                                status : option,
                                ip_webconsole : rows[0].ip_webconsole,
                                port_webconsole : rows[0].port_webconsole,
                                ip_balancer : rows[0].ip_balancer,
                                port_balancer : rows[0].port_balancer
                            }
                            res.json(result); 
                        })                    
                    }) 
                }                                
              })
            }
            
                       
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}

function req_start(servicename, request, rows)
{
    var data;
    if(rows.length > 1)
    {
        data = {
            servicename: servicename,
            request: request,
            host: rows[0].ip_balancer+':'+rows[0].port_balancer,
            worker1: rows[0].ip_address+':'+rows[0].port_address,
            worker2: rows[1].ip_address+':'+rows[1].port_address
        }

    }
    else
        data = {
            servicename: servicename,
            request: request,
            host: rows[0].ip_balancer+':'+rows[0].port_balancer,
            worker1: rows[0].ip_address+':'+rows[0].port_address            
        }

    var req_balancer = requestify.request('http://10.151.36.79:1000/start', {
        method: 'POST',
        body: data,
        headers: {
            'X-Forwarded-By': 'me'
        },
        cookies: {
            mySession: 'some cookie value'
        },

        dataType: 'json'        
    })
    .then(function(response) {
        // get the response body 
        response.getBody();
        console.log(response.getBody());
    });

    var req_webconsole = requestify.request('http://10.151.36.79:1000/start', {
        method: 'POST',
        body: {
            servicename: servicename+"_root",
            request: '1000000',
            host: rows[0].ip_webconsole+':'+rows[0].port_webconsole,
            worker1: rows[0].ip_address+':80'            
        },
        headers: {
            'X-Forwarded-By': 'me'
        },
        cookies: {
            mySession: 'some cookie value'
        },

        dataType: 'json'        
    })
    .then(function(response) {
        // get the response body 
        response.getBody();
        console.log(response.getBody());
    });

}

function req_stop(servicename)
{
    var stop_service = requestify.request('http://10.151.36.79:1000/stop', {
        method: 'POST',
        body: {
            servicename: servicename,
        },
        headers: {
            'X-Forwarded-By': 'me'
        },
        cookies: {
            mySession: 'some cookie value'
        },

        dataType: 'json'        
    })
    .then(function(response) {
        // get the response body 
        response.getBody();
    });
}

function create_lxc(servicename,ip_address,worker_ip)
{
    var stop_service = requestify.request('http://'+worker_ip+':3000/create', {
        method: 'POST',
        body: {
            servicename: servicename,
        },
        headers: {
            'X-Forwarded-By': 'me'
        },
        cookies: {
            mySession: 'some cookie value'
        },

        dataType: 'json'        
    })
    .then(function(response) {
        // get the response body 
        response.getBody();
    });
}

function start_lxc(servicename,ip_address,worker_ip)
{
    var stop_service = requestify.request('http://'+worker_ip+':3000/start', {
        method: 'POST',
        body: {
            servicename: servicename,
            ip_address: ip_address
        },
        headers: {
            'X-Forwarded-By': 'me'
        },
        cookies: {
            mySession: 'some cookie value'
        },

        dataType: 'json'        
    })
    .then(function(response) {
        // get the response body 
        response.getBody();
    });
}

function stop_lxc(servicename,ip_address,worker_ip)
{
    var stop_service = requestify.request('http://'+worker_ip+':3000/stop', {
        method: 'POST',
        body: {
            servicename: servicename,
            ip_address: ip_address
        },
        headers: {
            'X-Forwarded-By': 'me'
        },
        cookies: {
            mySession: 'some cookie value'
        },

        dataType: 'json'        
    })
    .then(function(response) {
        // get the response body 
        response.getBody();
    });
}

function control_lxc(servicename, rows, option, request)
{  
    if(option == 'CREATE'){
        if(rows.length > 1)
        {
            create_lxc(servicename,rows[0].ip_address,"10.151.36.38")
            create_lxc(servicename,rows[1].ip_address,"10.151.36.206")
            console.log("create 2 worker");
        }
        else
        {
            create_lxc(servicename,rows[1].ip_address,"10.151.36.206")
            console.log("create 1 worker");

        }
        //create.clone(servicename);
        
    }
    else if(option == 'START') 
    {
        if(rows.length > 1)
        {
            // create.start(servicename, rows[0].ip_address);
            // create.start(servicename, rows[1].ip_address);
            start_lxc(servicename,rows[0].ip_address,"10.151.36.38")
            start_lxc(servicename,rows[1].ip_address,"10.151.36.206")
            console.log("start 2 worker");
        }
        else
        {            
            // create.start(servicename, rows[0].ip_address);
            start_lxc(servicename,rows[0].ip_address,"10.151.36.206")
            console.log("start 1 worker");
        }

        req_start(servicename, request, rows);
    }

    else if(option == 'STOP') 
    {
        // create.stop(servicename);
        console.log("stop worker");
        stop_lxc(servicename,rows[0].ip_address,"10.151.36.38")
        stop_lxc(servicename,rows[1].ip_address,"10.151.36.206")
        req_stop(servicename);
        req_stop(servicename+'_root');
    }

    else if(option == 'delete'){
      create.destroy(servicename);  
    }
    
}

app.post("/", function(req, res){
    var servicename = req.body.servicename;
    var option = req.body.option;
    
    handle_database(req, res);
    // console.log(check);
    // if(!check)
    // {
    //     var result = {result : 'OK'}
    //     // res.json(result);
    // }   
    
})

app.listen(4000);


