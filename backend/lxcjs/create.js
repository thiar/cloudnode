
var spawn = require('child_process').spawn, 
    exec = require('child_process').exec;

//fungsi clone di gunakan untuk membuat virtual host baru
//parameter vm1 diisi dengan 'template'
//parameter vm2 diisi dengan 'vmnamaUser'
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
//fungsi start digunakan untuk memulai virtual host yang sudah dibuat
//parameter vm diisi dengan 'vmnamaUser'
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
//fungsi stop digunakan untuk menghentikan virtual host yang sudah dibuat
//parameter vm diisi dengan 'vmnamaUser'
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
//fungsi delete digunakan untuk menghapus virtual host yang sudah dibuat
//parameter vm diisi dengan 'vmnamaUser'
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

