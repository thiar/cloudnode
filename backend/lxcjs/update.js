
var spawn = require('child_process').spawn, 
    exec = require('child_process').exec;

//fungsi installFram digunakan untuk menginstall framework node js
//parameter namaFrame diisi dengan 'nama framework yang ingin di install'
//parameter vm diisi dengan 'vmnamaUser'

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

//fungsi installApps digunakan untuk menginstall aplikasi tambahan
//parameter namaApps diisi dengan 'nama aplikasi yang ingin di install'
//parameter vm diisi dengan 'vmnamaUser'

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

