#!/usr/bin/env node
var PushBullet = require('pushbullet');
var options = { fullResponses : false };
var pusher = new PushBullet('PushBulletAPI', options);

var stream = pusher.stream();

stream.on('connect', function() {
        console.log('Stream connected');
}).on('close', function() {
        console.log('Stream closed');
}).on('error', function(error) {
        console.log('Stream received error');
        console.log(error);
}).on('message', function(message) {


}).on('tickle', function(type) {


}).on('push', function(push) {
        if(push.title=="Inkommande samtal")
{
        console.log(push.body);
        var d = new Date();
        d.setHours( d.getHours() + 1 );
                d = d.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        var exec = require('child_process').exec;
        var reg = new RegExp('^\\d+$'); 
        if(reg.test(push.body))                                                                                        
        {                                                                                                                               
        var args = '-v -u FreshDeskAPIKeyHere:X -H "Content-Type: application/json" -d \'{ "phone": "'+push.body+'", "description": "Tid för samtal: '+d+'", "subject": "Telefonsamtal", "name": "New contact" }\' -X POST "YourFreshDeskURL/api/v2/tickets"';
        console.log(args);                                                                                                      
        exec('curl ' + args, function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);                                                                                       
                console.log('stderr: ' + stderr);                                                                                       
                if (error !== null) {                                                                                                           
                console.log('exec error: ' + error);                                                                            
                }                                                                                                       
                });                                                                                                                     
                setTimeout(function () {
    console.log('timeout completed');
}, 90000);
}
}
});
stream.connect();

process.on('SIGTERM', function() {
        stream.close();
});
