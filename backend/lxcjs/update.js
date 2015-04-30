
var spawn = require('child_process').spawn, 
    exec = require('child_process').exec;

function clone(vm1, vm2){
    var c = spawn('lxc-clone',['-0',vm1,'-n',vm2]);
    c.stdout.on('data', function (data) {
	console.log('stdout: ' + data);
    });
    c.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    c.on('exit', function(code){
    	if(0 == code){
	    console.log("lxc-create: "+ vm2);
	}
    });
}
function start(vm){
    var c = spawn('lxc-start',['-n',vm,'--daemon']);
    c.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    c.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    c.on('exit', function(code){
        if(0 == code){
            console.log(vm + " ON");
        }
    });

}
function stop(vm){
    var c = spawn('lxc-stop',['-n',vm]);
    c.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    c.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    c.on('exit', function(code){
        if(0 == code){
            console.log(vm + " OFF");
        }
    });

}

function delete(vm){
    var c = spawn('lxc-destroy',['-n',vm]);
    c.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    c.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    c.on('exit', function(code){
        if(0 == code){
            console.log(vm + " OFF");
        }
    });

}
function installFram(namaFrame, vm){
    var c = exec('chroot /var/lib/lxc/'+vm+'/rootfs/ npm install -g'+namaFrame);
    c.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    c.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    c.on('exit', function(code){
        if(0 == code){
            console.log(namaFrame+' terinstall di '+ vm);
        }
    });
}

function installApps(namaApps, vm){
    var c = exec('chroot /var/lib/lxc/'+vm+'/rootfs/ apt-get --yes --force-yes install '+namaApps);
    c.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    c.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    c.on('exit', function(code){
        if(0 == code){
            console.log(namaApps+' terinstall di '+ vm);
        }
    });
}


//function config(vm,ip){
//    var c = exec('cat >> /var/lib/lxc/'+vm+'/config << EOF'+'\n'+
//	'lxc.network.ipv4 ='+ip+'\n'+
//	'lxc.network.ipv4.gateway = 10.0.3.1'+'\n'+'EOF');
//    c.stdout.on('data', function (data) {
//        console.log('stdout: ' + data);
//    });
//    c.stderr.on('data', function (data) {
//        console.log('stderr: ' + data);
//    });
//    c.on('exit', function(code){
//      if(0 == code){
//            console.log(vm + " OFF");
//        }
//    });
//}

//clone('vm1', 'vm2');
//stop('vm1');
//stop('vm2');
//config('vm1','10.0.3.3');
//start('vm1');
