/**
 * Created by knut on 2016-04-16.
 */

var cribLog = require('../../crib-log/src/api');
var log = cribLog.createLogger('crib-mq-client','debug');

module.exports.create = function(port){

    console.log('Creating message queue');
    var io         = require('socket.io')();
    var middleware = require('socketio-wildcard')();

    io.use(middleware);


    io.on('connection', function (socket) {

        socket.on('*', function(message){
            log.trace('Got => ',message.data[0],' ',message.data[1]);
            io.emit(message.data[0], message.data[1]);

        });

        socket.on('disconnect', function (data) { console.log('Got disconnect',data);});


    });

    io.listen(port);
};

module.exports.register = function(name,url){
    let bussUrl = url;
    if(!url){
        bussUrl = process.env.CRIB_BUSS_URL;
    }

    log.info('Registering client ',name,' to url = ', bussUrl);
    var io = require('socket.io-client');
    var socket = io.connect(bussUrl, {reconnect: true});
    socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
        log.debug('Connected'); // data will be 'woot'
        socket.emit('REGISTER_CLIENT',name);
    });
    return socket;
};

module.exports.unregister = function(name){

};
