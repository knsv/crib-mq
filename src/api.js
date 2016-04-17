/**
 * Created by knut on 2016-04-16.
 */

module.exports.create = function(port){

    console.log('Starting message queue');
    var io         = require('socket.io')();
    var middleware = require('socketio-wildcard')();

    io.use(middleware);


    io.on('connection', function (socket) {

        socket.on('*', function(message){
            console.log('Got => ',message.data[0],' ',message.data[1]);
            io.emit(message.data[0], message.data[1]);

        });

        socket.on('disconnect', function (data) { console.log('Got disconnect',data);});


    });

    io.listen(port);
};

module.exports.register = function(name , bussUrl){
    console.log('Registering client ',name);
    var io = require('socket.io-client');
    var socket = io.connect(bussUrl, {reconnect: true});
    socket.on('connect', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
        console.log('Connected'); // data will be 'woot'
        socket.emit('REGISTER_CLIENT',name);
    });
    return socket;
};

module.exports.unregister = function(name){

};
