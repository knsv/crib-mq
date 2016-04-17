/**
 * Created by knut on 2016-04-16.
 */



// io.on('connection', function (socket) {
//     socket.emit('news', { hello: 'world' });
//     socket.on('my other event', function (data) {
//         console.log(data);
//     });
// });



module.exports.create = function(port){
// note, io(<port>) will create a http server for you



    console.log('Starting message queue');
    var io         = require('socket.io')();
    var middleware = require('socketio-wildcard')();

    io.use(middleware);


    io.on('connection', function (socket) {
        console.log('Got connection ...');

        io.emit('this', { will: 'be received by everyone'});

        socket.on('*', function(message){
            console.log('Got => ',message.data[0],' ',message.data[1],' passing it on');
            io.emit(message.data[0], message.data[1]);

        });

        socket.on('disconnect', function () { console.log('Got disconnect');});


    });

    io.listen(port);
};

module.exports.register = function(name , bussUrl){
    console.log('Registering client ',name);
    var io = require('socket.io-client');
    var socket = io.connect(bussUrl, {reconnect: true});
    socket.on('this', function () { // TIP: you can avoid listening on `connect` and listen on events directly too!
            console.log('got this'); // data will be 'woot'
    });
    return socket;
};

module.exports.unregister = function(name){

};
